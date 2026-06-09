class ItensSolicitacaoService {
  constructor(conexao) {
    this.conexao = conexao;
  }

  async inserirItensSolicitacao(idSolicitacao, itens) {
    const query = 'INSERT INTO ITENS_SOLICITACAO (ID_SOLICITACAO, ID_PRODUTO, QUANTIDADE, PRECO_UNITARIO) VALUES (?, ?, ?, ?)';
    for (const item of itens) {
      await this.conexao.query(query, [
        idSolicitacao,
        item.id_produto,
        item.quantidade,
        item.preco_unitario
      ]);
    }
  }
}

module.exports = ItensSolicitacaoService;
