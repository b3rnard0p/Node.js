class SolicitarCompraService {
  constructor(conexao) {
    this.conexao = conexao;
  }

  async inserirSolicitacaoCompra(idUsuario) {
    const query = 'INSERT INTO SOLICITACAO_COMPRAS (ID_USUARIO) VALUES (?)';
    const [result] = await this.conexao.query(query, [idUsuario]);
    return result.insertId;
  }

  async atualizarSolicitacaoCompra(idSolicitacao, idUsuario, versao) {
    const query = 'UPDATE SOLICITACAO_COMPRAS SET ID_USUARIO = ?, VERSAO = VERSAO + 1 WHERE ID = ? AND VERSAO = ?';
    const [result] = await this.conexao.query(query, [idUsuario, idSolicitacao, versao]);

    if (result.affectedRows === 0) {
      throw new Error('Conflito detectado: os dados foram alterados por outra transação.');
    }
  }

  async excluirSolicitacaoCompra(idSolicitacao) {
    const query = 'DELETE FROM SOLICITACAO_COMPRAS WHERE ID = ?';
    await this.conexao.query(query, [idSolicitacao]);
  }
}

module.exports = SolicitarCompraService;