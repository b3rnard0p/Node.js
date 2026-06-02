const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outDir = path.join(__dirname, '..', 'samples');
const outFile = path.join(outDir, 'Fatura_DevFull_Teste.pdf');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream(outFile);
doc.pipe(stream);

doc.fontSize(14).text('Fatura de Servicos - Nexity Academy');
doc.fontSize(10).text('Santa Maria, RS - Brasil');
doc.moveDown();
doc.text('Dados do Cliente:');
doc.text('Nome: Universidade Alpha (Departamento de Sistemas)');
doc.text('CNPJ: 12.345.678/0001-90');
doc.text('E-mail: financeiro@universidadealpha.edu.br');
doc.moveDown();
doc.text('Detalhes da Fatura:');
doc.text('Numero da Fatura: INV-2026-0042');
doc.text('Data de Emissao: 02/06/2026');
doc.text('Data de Vencimento: 15/07/2026');
doc.moveDown();
doc.text('Descricao do Servico    Qtd    Valor (R$)');
doc.text('Licenca Anual Plataforma Gamificada    1    R$ 2.500,00');
doc.text('Suporte Tecnico - Horas    10    R$ 950,90');
doc.moveDown();
doc.text('O Valor Total da fatura e de R$ 3.450,90');
doc.text('a ser pago nesta data.');
doc.moveDown();
doc.text(
  'Clausula de Atraso: Em caso de atraso no pagamento apos a Data de Vencimento (15/07/2026), sera cobrada uma multa de 2% sobre o Valor Total, acrescida de juros moratorios de 1% ao mes. A chave Pix para pagamento e o CNPJ 98.765.432/0001-10.'
);

doc.end();

stream.on('finish', () => {
  console.log('PDF gerado:', outFile);
  process.exit(0);
});

stream.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
