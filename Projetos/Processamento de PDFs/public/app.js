async function fazerUpload() {
  const fileInput = document.getElementById('pdfInput');
  const statusText = document.getElementById('statusMensagem');

  if (fileInput.files.length === 0) {
    statusText.innerText = 'Por favor, selecione um arquivo PDF primeiro.';
    return;
  }

  const formData = new FormData();
  formData.append('pdfDocument', fileInput.files[0]);

  statusText.innerText = 'Realizando upload e processamento... (Aguarde)';

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      const valor = data.dadosExtraidos?.valor;
      const valorExibicao =
        valor != null
          ? valor.toFixed(2).replace('.', ',')
          : 'Não encontrado';
      statusText.innerText = `Sucesso! Extraído: R$ ${valorExibicao}`;
      carregarDocumentos();
      fileInput.value = '';
    } else {
      statusText.innerText = `Erro: ${data.error}`;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    statusText.innerText = 'Erro ao conectar com o servidor.';
  }
}

async function carregarDocumentos() {
  try {
    const response = await fetch('/api/documentos');
    const documentos = await response.json();
    const tbody = document.getElementById('tabelaDocumentos');
    tbody.innerHTML = '';

    documentos.forEach((doc) => {
      const tr = document.createElement('tr');

      const emissaoFormatada = doc.data_emissao
        ? new Date(doc.data_emissao).toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
          })
        : 'N/A';
      const vencimentoFormatada = doc.data_vencimento
        ? new Date(doc.data_vencimento).toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
          })
        : 'N/A';
      const uploadFormatado = new Date(doc.data_upload).toLocaleString('pt-BR');

      const cnpjExibido = doc.cnpj ? doc.cnpj : 'Não identificado';
      const emailExibido = doc.email_cliente
        ? doc.email_cliente
        : 'Não identificado';
      const valorFormatado =
        doc.valor_extraido !== null
          ? `R$ ${parseFloat(doc.valor_extraido).toFixed(2).replace('.', ',')}`
          : 'Erro na leitura';

      tr.innerHTML = `
        <td>${doc.id}</td>
        <td>${doc.nome_arquivo}</td>
        <td>${cnpjExibido}</td>
        <td>${emailExibido}</td>
        <td>${emissaoFormatada}</td>
        <td>${vencimentoFormatada}</td>
        <td><strong>${valorFormatado}</strong></td>
        <td>${uploadFormatado}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Falha catastrófica ao renderizar tabela:', error);
  }
}

window.onload = carregarDocumentos;
