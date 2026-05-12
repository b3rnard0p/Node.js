require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const USERS = []; // Em produção, utilize o MongoDB
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_ufn';

// Rota de Registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  USERS.push({ email, password });
  res.status(201).send({ message: 'Usuario criado com sucesso' });
});
// Rota de Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).send({ message: 'Credenciais invalidas' });
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Auth Service rodando na porta ${PORT}`));
