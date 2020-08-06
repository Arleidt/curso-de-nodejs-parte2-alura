const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro.dao.js');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroControlador{
  //metodo estatico responsavel por me retornar um objeto javascript com todas as rotas relativas a livros
  static rotas(){
    return { 
      autenticadas: '/livros*',
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id'
    };
  }

 //método lista, retorna função que é executada quando nossa rota de listagem de livros é acionada pego callback do rota.js
  lista(){
    return function(req, resp){
      //instancia da classe
      const livroDao = new LivroDao(db);
  
        livroDao.lista()
            .then(livros => resp.marko(
                  templates.livros.lista,
              //require('../views/livros/lista/lista.marko'),
                  {
                      livros: livros
                  }
            ))
              .catch(erro => console.log(erro));
    };
  }

  formularioCadastrado(){
      return function(req, resp){
          //resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
             resp.marko(templates.livros.form, { livro: {} });
      };
  }

  formularioEdicao(){
    return function(req, resp) {
      const id = req.params.id;
      const livroDao = new LivroDao(db);
  
      livroDao.buscaPorId(id)
          .then(livro => 
              resp.marko(
                  //require('../views/livros/form/form.marko'),
                  templates.livros.form,
                  { livro: livro }
              )
          )
          .catch(erro => console.log(erro));  
    };
  }

  cadastra(){
    return  function(req, resp) {
      console.log(req.body);
      const livroDao = new LivroDao(db);
      //meu callback, const errors recebendo o retorno de validationResult que vai nos retornar os erros que por ventura aconteceram no momento da validação.
      const erros = validationResult(req);
       //se aconteceu algum erro, se aconteceu quero voltar para formulario. se meus errors não estão vazios. Se não estão vazios aconteceu algum erro, houve problema e quero retornar para forms, além disso segundo parametro um livro vazio para usar dentro template e segunda função recebe errors.array que devolve array de erros
      if (!erros.isEmpty()) {
          return resp.marko(
              //require('../views/livros/form/form.marko'),
              templates.livros.form,
              { 
                  //livro: {},
                  livro: req.body, 
                  errosValidacao: erros.array()
              }
          );
      }//return res.status(400).json({ errors: errors.array() });

      livroDao.adiciona(req.body)
              // agora o redirecionamento é feito utilizando o método
              // estático que encapsula as URLs das rotas.
              .then(resp.redirect(LivroControlador.rotas().lista))
              .catch(erro => console.log(erro));
    };

  }

  edita(){
    return function(req, resp) {
      console.log(req.body);
      const livroDao = new LivroDao(db);
  
        livroDao.atualiza(req.body)
            .then(resp.redirect(LivroControlador.rotas().lista))
            .catch(erro => console.log(erro));  
    };
  }

  remove(){
    return function(req, resp) {
      //recuperando valor variável
      const id = req.params.id;
      
      const livroDao = new LivroDao(db);
      livroDao.remove(id)
              //tudo deu certo devolve status 200
              .then(() => resp.status(200).end())
              .catch(erro => console.log(erro));
    };
  }  
}

module.exports = LivroControlador;

 
/* No rota criar umas instancia da classe livro controlador e chamar método lista

Sempre que quisermos a URL de listagem de livros, pediremos para a classe LivroControlador retornar
essas rotas e buscaremos a chave lista, que nos retornará exatamente a URL /livros
necessária para esse processo. 
Dessa forma, manteremos as rotas relativas aos livros em um único lugar, facilitando qualquer alteração. */