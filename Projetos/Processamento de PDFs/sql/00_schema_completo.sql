-- Instalação nova (Parte 1 + Parte 2 em um único script)
CREATE DATABASE IF NOT EXISTS pdf_pipeline;
USE pdf_pipeline;

CREATE TABLE IF NOT EXISTS documentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_arquivo VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20),
  email_cliente VARCHAR(100),
  data_emissao DATE,
  data_vencimento DATE,
  valor_extraido DECIMAL(10,2),
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
