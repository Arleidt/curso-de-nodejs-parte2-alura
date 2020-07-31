//encapsulamento do modulo express no arquivo custom-express,js

//habilitar biblioteca marko na nossa aplicação primeiro habilita no node e segundo no express
require('marko/node-require').install();
require('marko/express');

//importa e retorna função express
const express = require('express');
//chamando função express obtendo um objeto do tipo express,  para configurar a nossa aplicação, e execute express();
const app = express();
//chamando modulo body-parser,  uma nova constante bodyParser que vai receber o retorno do require('body-parser').
const bodyParser = require('body-parser');
//chamando modulo method-override.
const methodOverride = require('method-override');
//metodo use criar middleware, sempre que encontrar /estático ative o middleware, req para recurso estático. Met estático indicar express onde está pasta de arq estáticos. req para estatico o express vai ativar o middleware retornado pelo metodo static
app.use('/estatico', express.static('src/app/public'));
//usaremos o app (que é o objeto do express) para invocar o método use() recebendo exatamente o middleware que queremos definir na nossa aplicação.
app.use(bodyParser.urlencoded({ 
  extended: true
}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
//importando rotas e suas funções e passando para constante rotas
const rotas = require('../app/rotas/rotas');
//constante rotas recebendo objeto app
rotas(app);
//criando middleware para comum para status 404 é um código de resposta HTTP que indica que o cliente pôde comunicar com o servidor, mas ou o servidor não pôde encontrar o que foi pedido, ou foi configurado para não cumprir o pedido e não revelar a razão, ou a página não existe mais. Eles não devem ser confundidos com outros erros nos quais uma conexão para o servidor de destino não pôde ser feita
//Tratamento de página não encontrada. Essa é a forma de tratamento de erros para quando um determinado recurso/página não é encontrado na aplicação.
app.use(function(req, resp, next){
  return resp.status(404).marko(
    require('../app/views/base/erros/404.marko')
  );
});
//criando middleware de erro, obrigatorio 4 parametros mesmo não usando erro para express diferenciar um middleware comum de um de erro. O código 500 é um status de erro HTTP que indica uma dificuldade de processamento do servidor, a partir de uma incompatibilidade ou configuração incorreta em uma aplicação de um site
//Tratamento de erro interno na aplicação. Essa é a forma de tratamento de erros internos da aplicação, como quando acessamos uma propriedade inexistente de um objeto ou uma exceção é lançada.
app.use(function(erro, req, resp, next){
  // console.log(erro);
  return resp.status(500).marko(
    require('../app/views/base/erros/500.marko')
  );
});

//exportando constante app pelo modulo custom-express.js
module.exports = app;


/**Passaremos bodyParser, para o qual delegaremos a criação desse middleware, e o método 
urlencoded(), que define como o body-parser deve funcionar, e que está ligado à forma padrão de 
envio dos formulários HTML. Esse método receberá um objeto JavaScript com a configuração 
extended : true. Dessa forma, ele estará habilitado a receber objetos complexos em 
formato .json vindos do nosso formulário no navegador. Fazendo essa configuração, o bodyParser 
nos devolverá o middleware que precisamos. 

method override:
Nesse código, estamos verificando se o corpo da requisição é do tipo object e se, nele, existe 
um _method. Em caso positivo, o valor passado no <input> será salvo em uma variável method. 
Ao final, esse novo método será retornado.
Sempre que quisermos que um método seja sobrescrito, também precisaremos adicionar ao 
formulário um <input> do tipo hidden com o nome _method e passando como valor o método 
que será utilizado para sobrescrevê-lo:

O código não irá funcionar como esperado, pois, como visto durante o curso, a ordem da definição 
dos middlewares é importante e altera o resultado. Incorretamente definiu o
 middleware do method-override antes do middleware do body-parser, fazendo exatamente o oposto
  ao que é dito na documentação do method-override. Dessa forma, como o middleware do
   body-parser foi definido apenas depois, todo o corpo da requisição estará com o valor undefined
    fazendo com que o method-override não funcione da maneira como nossa colega esperava.

    linha express-validator
    O Express Validator é um conjunto de middlewares que encapsulam diversos recursos da biblioteca
     validator.js. E dentre esses recursos está a validação de dados!
*/