const path = require("path");

// Basename - nome do arquivo atual
console.log(path.basename(__filename));

// Dirname - nome do diretório atual
console.log(path.dirname(__filename));

// Extname - extensão do arquivo
console.log(path.extname(__filename));

// Criar um objeto path
console.log(path.parse(__filename));

// Juntar caminhos de arquivos
console.log(path.join(__dirname, "test", "test.html"));