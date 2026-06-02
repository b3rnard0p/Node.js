const REGEX_CNPJ = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;
const REGEX_DATA_BR = /(\d{2}\/\d{2}\/\d{4})/;
const REGEX_VALOR_BR = /(\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2})/;

function formatarDataParaMysql(dataBr) {
  if (!dataBr) return null;
  const partes = dataBr.split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes;
  return `${ano}-${mes}-${dia}`;
}

function parseValorBr(valorStr) {
  if (!valorStr) return null;
  const n = parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function dataProximaDe(texto, palavrasChave, maxGap = 50) {
  for (const palavra of palavrasChave) {
    const re = new RegExp(
      `${palavra}[\\s\\S]{0,${maxGap}}?${REGEX_DATA_BR.source}`,
      'i'
    );
    const match = texto.match(re);
    if (match) return match[1];
  }
  return null;
}

function valorProximoDe(texto, palavrasChave, maxGap = 80) {
  for (const palavra of palavrasChave) {
    const re = new RegExp(
      `${palavra}[\\s\\S]{0,${maxGap}}?${REGEX_VALOR_BR.source}`,
      'i'
    );
    const match = texto.match(re);
    if (match) return parseValorBr(match[1]);
  }
  return null;
}

/** Padrões do laboratório (fatura modelo + boleto típico) */
function extrairPorRotulos(texto) {
  const matchCnpj = texto.match(
    /CNPJ\s*:?\s*([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})/i
  );
  const matchEmail = texto.match(
    /E-mail:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/i
  );
  const matchEmissao =
    texto.match(/Data de Emissao:\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i) ||
    texto.match(/Data Documento\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i);
  const matchVencimento =
    texto.match(/Data de Vencimento:\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i) ||
    texto.match(/Vencimento\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i);
  const matchValor =
    texto.match(
      /Valor Total[\s\S]*?R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2}|[0-9]+(?:\.[0-9]{2})?)/i
    ) ||
    texto.match(/Valor do Documento\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2})/i) ||
    texto.match(
      /R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2}|[0-9]+(?:\.[0-9]{2})?)/i
    );

  return {
    cnpj: matchCnpj?.[1] ?? null,
    email: matchEmail ? matchEmail[1].toLowerCase() : null,
    dataEmissao: matchEmissao ? formatarDataParaMysql(matchEmissao[1]) : null,
    dataVencimento: matchVencimento
      ? formatarDataParaMysql(matchVencimento[1])
      : null,
    valor: matchValor ? parseValorBr(matchValor[1]) : null,
  };
}

/**
 * Heurísticas genéricas: procura máscaras e valores no texto,
 * sem depender de um layout fixo (desde que o PDF tenha texto selecionável).
 */
function extrairPorHeuristica(texto) {
  const cnpjPertoRotulo = texto.match(
    new RegExp(`CNPJ[\\s\\S]{0,40}?(${REGEX_CNPJ.source})`, 'i')
  );
  const todosCnpj = [...texto.matchAll(new RegExp(REGEX_CNPJ.source, 'g'))].map(
    (m) => m[0]
  );

  const emails = [
    ...texto.matchAll(
      /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/gi
    ),
  ].map((m) => m[1].toLowerCase());

  const dataEmissaoBr =
    dataProximaDe(texto, [
      'data de emissao',
      'data de emissão',
      'data emissao',
      'data documento',
      'data do documento',
      'dt\\. documento',
      'emissao',
      'emissão',
    ]) || null;

  const dataVencimentoBr =
    dataProximaDe(texto, [
      'data de vencimento',
      'data vencimento',
      'vencimento',
      'venc\\.',
      'due date',
    ]) || null;

  let valor =
    valorProximoDe(texto, [
      'valor total',
      'valor do documento',
      'valor documento',
      'valor cobrado',
      'valor a pagar',
      'total a pagar',
      'total geral',
    ]) ?? null;

  if (valor == null) {
    const comSimbolo = texto.match(
      /R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2})/i
    );
    if (comSimbolo) valor = parseValorBr(comSimbolo[1]);
  }

  if (valor == null) {
    const candidatos = [...texto.matchAll(/\b(\d{1,3}(?:\.\d{3})*,\d{2})\b/g)]
      .map((m) => parseValorBr(m[1]))
      .filter((v) => v != null && v > 0);
    if (candidatos.length > 0) {
      valor = Math.max(...candidatos);
    }
  }

  return {
    cnpj: cnpjPertoRotulo?.[1] ?? todosCnpj[0] ?? null,
    email: emails[0] ?? null,
    dataEmissao: dataEmissaoBr ? formatarDataParaMysql(dataEmissaoBr) : null,
    dataVencimento: dataVencimentoBr
      ? formatarDataParaMysql(dataVencimentoBr)
      : null,
    valor,
  };
}

function mesclar(especifico, generico) {
  return {
    cnpj: especifico.cnpj ?? generico.cnpj,
    email: especifico.email ?? generico.email,
    dataEmissao: especifico.dataEmissao ?? generico.dataEmissao,
    dataVencimento: especifico.dataVencimento ?? generico.dataVencimento,
    valor: especifico.valor ?? generico.valor,
  };
}

function extrairMetadados(texto) {
  const normalizado = texto.replace(/\s+/g, ' ').trim();
  const porRotulos = extrairPorRotulos(texto);
  const porHeuristica = extrairPorHeuristica(normalizado);
  return mesclar(porRotulos, porHeuristica);
}

module.exports = { extrairMetadados, formatarDataParaMysql };
