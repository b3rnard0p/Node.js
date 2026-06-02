const express = require('express');
const multer = require('multer');
const { extrairTextoPdf } = require('./lib/extrairTextoPdf');
const mysql = require('mysql2/promise');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dirUploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(dirUploads)) {
  fs.mkdirSync(dirUploads);
}

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'laboratorio',
  database: 'pdf_pipeline',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

function formatarDataParaMysql(dataBr) {
  if (!dataBr) return null;
  const partes = dataBr.split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes;
  return `${ano}-${mes}-${dia}`;
}

app.post('/api/upload', upload.single('pdfDocument'), async (req, res) => {
  let filePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    filePath = req.file.path;
    const fileName = req.file.originalname;

    const dataBuffer = await fs.promises.readFile(filePath);
    const extractedText = await extrairTextoPdf(dataBuffer);

    const regexCnpj = /CNPJ:\s*([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2})/i;
    const matchCnpj = extractedText.match(regexCnpj);
    const cnpjFinal = matchCnpj ? matchCnpj[1] : null;

    const regexEmail = /E-mail:\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/i;
    const matchEmail = extractedText.match(regexEmail);
    const emailFinal = matchEmail ? matchEmail[1].toLowerCase() : null;

    const regexEmissao = /Data de Emissao:\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i;
    const matchEmissao = extractedText.match(regexEmissao);
    const dataEmissaoFormatada = matchEmissao
      ? formatarDataParaMysql(matchEmissao[1])
      : null;

    const regexVencimento = /Data de Vencimento:\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/i;
    const matchVencimento = extractedText.match(regexVencimento);
    const dataVencimentoFormatada = matchVencimento
      ? formatarDataParaMysql(matchVencimento[1])
      : null;

    const regexValorTotal =
      /Valor Total[\s\S]*?R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2}|[0-9]+(?:\.[0-9]{2})?)/i;
    const regexValor = /R\$\s*([0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2}|[0-9]+(?:\.[0-9]{2})?)/i;
    const matchValor =
      extractedText.match(regexValorTotal) || extractedText.match(regexValor);
    let valorFinal = null;
    if (matchValor && matchValor[1]) {
      valorFinal = parseFloat(
        matchValor[1].replace(/\./g, '').replace(',', '.')
      );
    }

    const queryInsert = `
      INSERT INTO documentos (nome_arquivo, cnpj, email_cliente, data_emissao, data_vencimento, valor_extraido)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(queryInsert, [
      fileName,
      cnpjFinal,
      emailFinal,
      dataEmissaoFormatada,
      dataVencimentoFormatada,
      valorFinal,
    ]);

    res.json({
      message: 'Pipeline avançado concluído!',
      dadosExtraidos: {
        arquivo: fileName,
        cnpj: cnpjFinal,
        email: emailFinal,
        emissao: dataEmissaoFormatada,
        vencimento: dataVencimentoFormatada,
        valor: valorFinal,
      },
    });
  } catch (error) {
    console.error('Falha crônica no processamento:', error);
    res.status(500).json({ error: 'Erro no processamento interno do arquivo.' });
  } finally {
    if (filePath) {
      try {
        await fs.promises.unlink(filePath);
      } catch (unlinkError) {
        console.error('Erro na liberação de recurso de disco:', unlinkError);
      }
    }
  }
});

app.get('/api/documentos', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM documentos ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro na recuperação de registros do banco.' });
  }
});

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando e monitorando em http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Porta ${PORT} já está em uso. Encerre o processo anterior ou rode: $env:PORT=3001; npm run dev`
    );
    process.exit(1);
  }
  throw err;
});
