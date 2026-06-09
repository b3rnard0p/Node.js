USE solicitacao_compras;

INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES
('João Silva', 'joao.silva@gmail.com', 'senha123'),
('Maria Oliveira', 'maria.oliveira@yahoo.com', 'senha456'),
('Carlos Santos', 'carlos.santos@hotmail.com', 'senha789'),
('Ana Pereira', 'ana.pereira@outlook.com', 'senha321'),
('Lucas Costa', 'lucas.costa@gmail.com', 'senha654');

INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO, ESTOQUE) VALUES
('Notebook', 'Notebook com 16GB RAM e SSD de 512GB', 3500.00, 10),
('Mouse', 'Mouse óptico sem fio', 75.50, 100),
('Teclado Mecânico', 'Teclado RGB com switches Blue', 250.00, 50),
('Monitor 24"', 'Monitor Full HD 24 polegadas', 1200.00, 30),
('Cadeira Gamer', 'Cadeira ergonômica ajustável', 800.00, 20);

INSERT INTO SOLICITACAO_COMPRAS (ID_USUARIO) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO ITENS_SOLICITACAO (ID_SOLICITACAO, ID_PRODUTO, QUANTIDADE, PRECO_UNITARIO) VALUES
(1, 1, 1, 3500.00),
(1, 2, 2, 75.50),
(2, 3, 1, 250.00),
(3, 4, 2, 1200.00),
(4, 5, 1, 800.00),
(5, 1, 1, 3500.00);
