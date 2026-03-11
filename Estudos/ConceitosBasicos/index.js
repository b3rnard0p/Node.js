const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Definir modelo
const Usuario = sequelize.define('Usuario', {
	nome: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

// Funções CRUD
async function criarUsuario(nome, email) {
	const usuario = await Usuario.create({ nome, email });
	console.log('Usuário criado:', usuario.toJSON());
	return usuario;
}

async function listarUsuarios() {
	const usuarios = await Usuario.findAll();
	console.log(
		'Lista de usuários:',
		usuarios.map((usuario) => usuario.toJSON())
	);
	return usuarios;
}

async function atualizarUsuario(id, novosDados) {
	const usuario = await Usuario.findByPk(id);

	if (!usuario) {
		console.log('Usuário não encontrado para atualização.');
		return null;
	}

	await usuario.update(novosDados);
	console.log('Usuário atualizado:', usuario.toJSON());
	return usuario;
}

async function excluirUsuario(id) {
	const usuario = await Usuario.findByPk(id);

	if (!usuario) {
		console.log('Usuário não encontrado para exclusão.');
		return false;
	}

	await usuario.destroy();
	console.log('Usuário excluído');
	return true;
}

async function main() {
	await sequelize.sync({ force: false });
	console.log('Banco sincronizado!');

	const usuarioCriado = await criarUsuario('Fabiano', 'fabiano@email.com');
	await listarUsuarios();
	await atualizarUsuario(usuarioCriado.id, { nome: 'Fabiano Flores' });
	// await excluirUsuario(usuarioCriado.id);
} 

main().catch((erro) => {
	console.error('Erro ao executar o CRUD:', erro);
});