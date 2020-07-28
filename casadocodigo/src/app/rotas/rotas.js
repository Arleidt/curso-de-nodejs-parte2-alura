//encapsulamento rotas

//import Livro.dao, Nota: repare que estamos usando LivroDao, com letra maiúscula, pois é uma referência exata à classe que criamos.
const LivroDao =require('../infra/livro.dao.js');

const db = require('../../config/database')
//  exportar uma função (que, no mundo JavaScript, é a instrução capaz de receber um parâmetro) capaz de receber o objeto app. 
//ECMAScript 6, que introduziu as famosas arrow functions:
module.exports = (app) => {
//metodos: get  primeiro parâmetros string qual a "rota caminho", segundo função callback executada sempre que cliente fazer requisição para '/ ' rota
  app.get('/', function(req, resp){
    //objeto represetando a  resposta, recebendo método send que recebendo uma string como parâmetro
    resp.send(
          `
            <html>
                  <head>
                      <meta charset="utf-8">
                  </head>
                  <body>
                      <h1> Casa do Código </h1>
                  </body> 
            </html>
          `
    );

  });

  app.get('/livros', function(req, resp){
    //instancia da classe
    const livroDao = new LivroDao(db);
      livroDao.lista()
          .then(livros => resp.marko(
            require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }

          ))
            .catch(erro => console.log(erro));
  });

  app.get('/livros/form', function(req, resp){
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} });

    
  });

  app.post('/livros', function(req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);
      livroDao.adiciona(req.body)
          .then(resp.redirect('/livros'))
          .catch(erro => console.log(erro));  
  });

  app.put('/livros', function(req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);
      livroDao.atualiza(req.body)
          .then(resp.redirect('/livros'))
          .catch(erro => console.log(erro));  
  });

  //:id criando variavel na url,qualquer coisa passada depois da ultima / vai ser salva dentro da var id
  app.delete('/livros/:id', function(req, resp) {
        //recuperando valor variável
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                //tudo deu certo devolve status 200
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
  });

  app.get('/livros/form/:id', function(req, resp) {
    const id = req.params.id;
    const livroDao = new LivroDao(db);

    livroDao.buscaPorId(id)
        .then(livro => 
            resp.marko(
                require('../views/livros/form/form.marko'),
                { livro: livro }
            )
        )
        .catch(erro => console.log(erro));

  });

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
      **/