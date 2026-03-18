const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('./db');
const { generateToken, verifyToken } = require('./auth');
const router = express.Router();
// Registro de usuário
router.post('/register',
    [
    body('username')
    .notEmpty().withMessage('O nome de usuário é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),
    body('password')
    .notEmpty().withMessage('A senha é obrigatória')
    .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
    }
    const { username, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    db.query("INSERT INTO users (username, passwordHash) VALUES (?, ?)",
    [username, passwordHash],
    (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.send("Usuário registrado com sucesso!");
    });
    }
   );
   
// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return res.status(500).send(err.message);
    const user = results[0];
    if (!user) return res.status(404).send("Usuário não encontrado");
    if (!bcrypt.compareSync(password, user.passwordHash)) {
       return res.status(401).send("Senha inválida");
    }
    const token = generateToken(user);
    res.json({ token });
    });
   });
// Listar tarefas
router.get('/tasks', verifyToken, (req, res) => {
 db.query("SELECT * FROM tasks WHERE userId = ?", [req.userId], (err, rows) => {
 if (err) return res.status(500).send(err.message);
 res.json(rows);
 });
});
// Criar tarefa
router.post('/tasks',
    verifyToken,
    [
    body('title')
    .notEmpty().withMessage('O título é obrigatório')
    .isLength({ max: 100 }).withMessage('O título deve ter no máximo 100 caracteres'),
    body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('A descrição deve ter no máximo 500 caracteres')
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
    }
    const { title, description } = req.body;
    db.query("INSERT INTO tasks (title, description, done, userId) VALUES (?, ?, ?, ?)",
    [title, description, false, req.userId],
    (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.send("Tarefa criada!");
    });
    }
   );
   
// Atualizar tarefa
router.put('/tasks/:id', verifyToken, (req, res) => {
 const { title, description, done } = req.body;
 db.query("UPDATE tasks SET title=?, description=?, done=? WHERE id=? AND userId=?",
 [title, description, done, req.params.id, req.userId],
 (err, result) => {
 if (err) return res.status(500).send(err.message);
 res.send("Tarefa atualizada!");
 });
});
// Deletar tarefa
router.delete('/tasks/:id', verifyToken, (req, res) => {
 db.query("DELETE FROM tasks WHERE id=? AND userId=?", [req.params.id, req.userId], (err,
result) => {
 if (err) return res.status(500).send(err.message);
 res.send("Tarefa removida!");
 });
});
module.exports = router;