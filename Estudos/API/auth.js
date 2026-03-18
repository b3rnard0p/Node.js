const jwt = require('jsonwebtoken');
const SECRET = 'segredo123';
function generateToken(user) {
 return jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
}
function verifyToken(req, res, next) {
 const token = req.headers['authorization'];
 if (!token) return res.status(401).send("Token não fornecido");
 jwt.verify(token, SECRET, (err, decoded) => {
 if (err) return res.status(401).send("Token inválido");
 req.userId = decoded.id;
 next();
 });
}
module.exports = { generateToken, verifyToken };