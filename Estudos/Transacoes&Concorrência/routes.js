const express = require('express');
const OrquestradorSolicitacao = require('./OrquestradorSolicitacao');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { id_usuario, itens } = req.body;
  try {
    await OrquestradorSolicitacao.registrarSolicitacao(id_usuario, itens);
    res.status(201).send('Solicitação registrada com sucesso!');
  } catch (erro) {
    res.status(500).send('Erro ao registrar solicitação: ' + erro.message);
  }
});

router.put('/update/:id', async (req, res) => {
  const idSolicitacao = req.params.id;
  const { id_usuario, versao } = req.body;
  
  try {
    await OrquestradorSolicitacao.atualizarSolicitacao(idSolicitacao, id_usuario, versao);
    res.status(200).send('Solicitação atualizada com sucesso!');
  } catch (erro) {
    res.status(500).send('Erro ao atualizar solicitação: ' + erro.message);
  }
});

router.delete('/delete/:id', async (req, res) => {
  const idSolicitacao = req.params.id;
  try {
    await OrquestradorSolicitacao.excluirSolicitacao(idSolicitacao);
    res.status(200).send('Solicitação excluída com sucesso!');
  } catch (erro) {
    res.status(500).send('Erro ao excluir solicitação: ' + erro.message);
  }
});

module.exports = router;