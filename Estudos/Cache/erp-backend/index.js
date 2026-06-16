const express = require('express');
const { createClient } = require('redis');
const app = express();
app.use(express.json());
// Emulando a captura do IP real do usuário para a funcionalidade de segurança
app.set('trust proxy', true);
// Configuração para conectar ao Upstash (Nuvem)
const redisClient = createClient({
  url: 'rediss://default:gQAAAAAAAkf2AAIgcDEwOTJlNjM3NDg5ZGM0ZTk2OTI4NjMwYTJjMTEwMzg0MA@moving-wasp-149494.upstash.io:6379'
});
redisClient.on('error', (err) => console.log('Erro de Conexão Redis:', err));
async function iniciarServidor() {
  await redisClient.connect();
  console.log('Conectado ao Redis na Nuvem (Upstash)!');
  app.listen(8080, () => {
    console.log('Servidor ERP rodando na porta 8080');
  });
}
iniciarServidor();

// ROTA 1: Relatório de Custos por Departamento
app.get('/api/relatorios/custos', async (req, res) => {
  try {
    const cacheRelatorio = await redisClient.get('relatorio_custos_mensal');
    if (cacheRelatorio) {
      console.log('Dados extraídos da memória (Redis Cloud)');
      return res.json(JSON.parse(cacheRelatorio));
    }
    console.log('Processando cálculos complexos no Banco Relacional...');
    // Simulação de uma query complexa (ex: SUM, JOINs) que demora 3 segundos
    setTimeout(async () => {
      const relatorioProcessado = {
        data_geracao: new Date().toISOString(),
        departamentos: [
          { nome: 'Tecnologia da Informação', custo: 150000 },
          { nome: 'Recursos Humanos', custo: 85000 },
          { nome: 'Operações', custo: 320000 }
        ]
      };
      // Armazena o relatório na nuvem por 60 segundos
      await redisClient.setEx('relatorio_custos_mensal', 60, JSON.stringify(relatorioProcessado));
      res.json(relatorioProcessado);
    }, 3000);
  } catch (error) {
    res.status(500).json({ erro: 'Falha no processamento do relatório' });
  }
});

// ROTA 2: Autenticação do Colaborador (Com proteção contra Força Bruta)
app.post('/api/login', async (req, res) => {
  const { matricula, senha } = req.body;
  // Captura o IP do usuário (para testes locais será ::1)
  const ipUsuario = req.ip;
  const chaveRedis = `tentativas_login:${ipUsuario}`;
  try {
    // Incrementa o número de tentativas deste IP
    const tentativas = await redisClient.incr(chaveRedis);
    // Se for a primeira tentativa, define a expiração para 60 segundos
    if (tentativas === 1) {
      await redisClient.expire(chaveRedis, 60);
    }
    // Bloqueia se ultrapassar 4 tentativas
    if (tentativas > 4) {
      return res.status(429).json({
        erro: 'Muitas tentativas de login. Sua conta foi temporariamente bloqueada. Tente novamente em 1 minuto.'
      });
    }
    // Validação fictícia de usuário
    if (matricula === '12345' && senha === 'senha_segura') {
      return res.json({ mensagem: 'Login efetuado com sucesso!', token: 'abc.123' });
    } else {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro no servidor de autenticação' });
  }
});
