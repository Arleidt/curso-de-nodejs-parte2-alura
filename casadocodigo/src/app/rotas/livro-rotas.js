//somente rotas referente a livros; Encapsulamento de rotas de livro

//importando requirindo modulo express-validator, busca funções check pra dizer quais validações quero realizar e a validationResult que vai pegar a requisição que está chegando no nosso servidor e verificar se houve algum erro de validação. 
const { check, validationResult } = require('express-validator/check');
//import Livro.dao, Nota: repare que estamos usando LivroDao, com letra maiúscula, pois é uma referência exata à classe que criamos.
const LivroDao = require('../infra/livro.dao.js');
const db = require('../../config/database');
//require para LivroControlador, representação da classe por isso L maiusculo da classe criada.
const LivroControlador = require('../controladores/livro-controlador.js');
//instancia livroControlador
const livroControlador = new LivroControlador();

const Livro = require('../modelos/livro.js');

const BaseControlador = require('../controladores/base-controlador.js');

//  exportar uma função (que, no mundo JavaScript, é a instrução capaz de receber um parâmetro) capaz de receber o objeto app. 
//ECMAScript 6, que introduziu as famosas arrow functions:
module.exports = (app) => {
  const rotasLivro = LivroControlador.rotas();

  app.use(rotasLivro.autenticadas, function(req, resp, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        resp.redirect(BaseControlador.rotas().login);
    }
});

 //De posse dessa instância, chamaremos o método livroControlador.lista() na nossa rota /livros. Que por sua vez vai retornar a função callback que tinhamos.
  app.get(rotasLivro.lista, livroControlador.lista() );
//agregaçao obj app recebe metodo route que recebe a url que quero rotear ai encadeio para metodos ex: get post put todos os verbos http que a gnt pode utilizar  em determinada url
  app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastrado())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita());

  app.get(rotasLivro.edicao, livroControlador.formularioEdicao());
      // //verificando titulo no metodo post se tem 5 caracteres e preço se esse campo tem valor monetário com express-validator. chamada para metodo withMessage se houver erro de validação que recebe uma string representando a mensagem de erro.

  //app.put(rotasLivro.cadastro, livroControlador.edita());
  //:id criando variavel na url,qualquer coisa passada depois da ultima / vai ser salva dentro da var id
  app.delete(rotasLivro.delecao, livroControlador.remove());

};



  /* 
    livroDao.lista(function(erro, resultados) {
      resp.marko(
          require('../views/livros/lista/lista.marko'),
          {
              livros: resultados
          }

      );

    } );
    
  });

} ;

 Linha 34- Quando fazemos a listagem, chamamos o método lista() do nosso livroDao, passando uma
  função de callback que é executada ao final da operação assíncrona do acesso ao banco de dados. 
  Por padrão, no mundo JavaScript, utilizam-se Promises para esse tipo de situação, e é isso que faremos agora.
 
//all metodo de listagem no bd, 2 parâmetros string representando o sql propriamente dito e e o segundo parâmetro uma função que vai ser executada quando nossa consulta tiver terminado
     db.all (' SELECT * FROM livros', function(erro, resultados){

      resp.marko(
        require('../views/livros/lista/lista.marko'),
        {
          //passando resultados que vieram do db
            livros : resultados
        }
  
      );

    } ); 

    resp.marko(
      require('../views/livros/lista/lista.marko'),
      {
        // recebendo segundo parametro, objeto javascript contendo as informações que vai enviar para a tela que vai ser carregada definido chaves e valores do objeto javascript
        //chave e valor array
          livros: [
            { 
                id: 1,
                titulo: 'Fundamentos do Node'
            },
            { 
                id: 2,
                titulo: 'Node Avançado'
            }
        ]

      }

    ); 
    

  });

} ;

        
    
    Agora, queremos acessar o conteúdo armazenado em lista.marko. Para isso, executaremos o
     método resp.marko(), que foi habilitado com a inclusão do Marko no nosso projeto. 
     Com ele, poderemos exibir arquivos .marko para o cliente na resposta, sendo necessário 
     apenas importar o arquivo com essa extensão, o que também é feito com o método require().
    resp.send(
          `
            <html>
                  <head>
                      <meta charset="utf-8">
                  </head>
                  <body>
                      <h1> Listagem de Livros </h1>
                  </body> 
            </html>
          `
    );
    app delete
    Precisamos que o express saiba que a informação que estamos passando na URL é a id do
     livro que queremos excluir, e que essa informação é variável para cada requisição. 
     Felizmente, o express nos possibilita criar variáveis na própria URL da rota. Para isso, 
     basta usarmos dois pontos (:) seguidos do nome da variável, que nesse caso é id.
     Para recuperarmos esse valor, basta, dentro do callback, buscarmos o id entre os parâmetros
      dentro da requisição (req.params.id). Essa informação será salva em uma constante id.
    
    
    app get buscaPorId
    Nessa etapa implementaremos a funcionalidade de edição dos nossos livros. De volta ao arquivo 
    rotas.js, criaremos uma nova rota para atender à URL /livros/form/:id - ou seja, a URL do nosso 
    formulário de cadastro, com a adição de uma sintaxe para criação de variáveis.
    Essa rota receberá uma função callback que será executada sempre que o usuário requisitá-la. 
    Com o id passado na URL, criaremos uma instância de livroDao, buscaremos o livro e, se tudo der 
    certo, devolveremos a página de formulário da nossa aplicação, passando como parâmetro um 
    objeto JavaScript com a propriedade livro e recebendo o valor livro que acabamos de receber.
    Se houver algum erro, vamos exibi-lo no console com console.log()


    form livro
    Porém, se tentarmos entrar na página http://localhost:3000/livros/form, nada será exibido. No
    console, teremos uma mensagem informando que os cabeçalhos não foram enviados com sucesso 
    para o cliente. Isso acontece porque, na pagina form.marko, estamos esperando um atributo 
    chamado livro. Porém, isso só acontece quando estamos editando um livro em /livros/form/:id, 
    passando o livro retornado da nossa busca para o template. No entanto, na rota /livros/form, 
    nenhum dado livro é passado, quebrando nossa aplicação. Para resolvermos esse problema, 
    nessa rota, passaremos para o método resp.marko() um objeto JavaScript com a propriedade
    livro vazia:
    app.get('/livros/form', function(req, resp) {
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    linha 1
     Express Validator é um conjunto de middlewares que encapsulam diversos recursos da biblioteca 
     validator.js, dentre os quais se encontra o recurso de validação de dados!

     linha 51 post
     Na realidade, o que estamos fazendo ao passar um array como segundo parâmetro do método 
     post() é adicionar um conjunto de validadores (todos eles middlewares que serão executados antes
     do callback da rota passado como terceiro parâmetro do post()), cada um deles retornando o que
     o Express Validator chama de validation chain! O validation chain nada mais é do que o 
     encadeamento das validações, que nos possibilita, dentre outras coisas, definir qual a validação 
     que será feita no campo e, inclusive, customizar a mensagem de erro da validação!
     Portanto, sempre que fazemos check('nomeDoCampo'), obtemos um validation chain que podemos
      utilizar para configurar a validação, a mensagem de erro e muito mais!
      Uma configuração válida para a validação de um campo nome que deve receber no mínimo 
      10 caracteres é a que pode ser vista a seguir!
      parte inicial do código omitida.
      app.post('/usuario', [
              check('nome').isLength({min: 10})
          ],
          function (req, res) {
              // conteúdo da função callback omitido.
          }
      );
      Muito bem, aluno! Está correto! Essa é outra alternativa! Em alguns, validações casos expressões 
      regulares caem como uma luva! Para isso, basta fazer algo como 
      check('meuCampo').matches(/* aqui vai a sua expressão regular ).
      **/