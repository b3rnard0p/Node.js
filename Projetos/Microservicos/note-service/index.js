require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_ufn';
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
const NoteSchema = new mongoose.Schema({
  content: String,
  userEmail: String
});
const Note = mongoose.model('Note', NoteSchema);
// Middleware de Autenticacao
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token obrigatorio');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Token invalido');
  }
};
// Rotas de Notas
app.get('/notes', authenticate, async (req, res) => {
  const notes = await Note.find({ userEmail: req.user.email });
  res.json(notes);
});
app.post('/notes', authenticate, async (req, res) => {
  const newNote = new Note({
    content: req.body.content,
    userEmail: req.user.email
  });
  await newNote.save();
  res.status(201).json(newNote);
});
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Note Service rodando na porta ${PORT}`));
