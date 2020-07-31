//Dentro de "views", criaremos outro arquivo templates.js, outro módulo exportando um objeto JavaScript. 
//Ele será o responsável por unir os dois arquivos index.js que acabamos de criar. Nele, teremos uma chave
// base fazendo o require() de './base', de modo a carregarmos o módulo contido no arquivo index.js dentro 
//da pasta "base". Isso significa que, por padrão, quando fazemos o require() de uma pasta com o NodeJS, 
//ele procura dentro dessa pasta um arquivo index.js, considerando-o como o módulo a ser importado.
// ex proprieda base está trazendo os objetos contendo todos os templates da pasta base do index.js da pasta base. Mesmo caso para livros. (Amarração)
module.exports = {
  base: require('./base'),
  livros: require('./livros')
}