const TransacaoBanco = require('./TransacaoBanco');
const SolicitarCompraService = require('./SolicitarCompraService');
const ItensSolicitacaoService = require('./ItensSolicitacaoService');

class OrquestradorSolicitacao {
  static async registrarSolicitacao(idUsuario, itens) {
    const transacao = new TransacaoBanco();
    try {
      await transacao.iniciarTransacao();
      const conexao = transacao.connection;

      const solicitarCompraService = new SolicitarCompraService(conexao);
      const itensSolicitacaoService = new ItensSolicitacaoService(conexao);

      const idSolicitacao = await solicitarCompraService.inserirSolicitacaoCompra(idUsuario);
      await itensSolicitacaoService.inserirItensSolicitacao(idSolicitacao, itens);

      await transacao.commit();
      console.log('Solicitação registrada com sucesso!');
    } catch (erro) {
      await transacao.rollback();
      throw new Error('Erro ao registrar solicitação: ' + erro.message);
    }
  }

  static async atualizarSolicitacao(idSolicitacao, idUsuario, versao) {
    const transacao = new TransacaoBanco();
    try {
      await transacao.iniciarTransacao();
      const conexao = transacao.connection;

      const solicitarCompraService = new SolicitarCompraService(conexao);
      await solicitarCompraService.atualizarSolicitacaoCompra(idSolicitacao, idUsuario, versao);

      await transacao.commit();
      console.log('Solicitação atualizada com sucesso!');
    } catch (erro) {
      await transacao.rollback();
      throw new Error('Erro ao atualizar a solicitação: ' + erro.message);
    }
  }

  static async excluirSolicitacao(idSolicitacao) {
    const transacao = new TransacaoBanco();
    try {
      await transacao.iniciarTransacao();
      const conexao = transacao.connection;

      const solicitarCompraService = new SolicitarCompraService(conexao);
      await solicitarCompraService.excluirSolicitacaoCompra(idSolicitacao);

      await transacao.commit();
      console.log('Solicitação excluída com sucesso!');
    } catch (erro) {
      await transacao.rollback();
      throw new Error('Erro ao excluir a solicitação: ' + erro.message);
    }
  }
}

module.exports = OrquestradorSolicitacao;