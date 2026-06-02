USE pdf_pipeline;

ALTER TABLE documentos
  ADD COLUMN cnpj VARCHAR(20) AFTER nome_arquivo,
  ADD COLUMN email_cliente VARCHAR(100) AFTER cnpj,
  ADD COLUMN data_emissao DATE AFTER email_cliente,
  ADD COLUMN data_vencimento DATE AFTER data_emissao;
