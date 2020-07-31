const templates = require('../views/templates');
class BaseControlador{

    static rotas(){
      //metodo estatico responsavel por me retornar um objeto javascript com todas as rotas relativas a livros
      return{
          home : '/', 
          login: '/login' // nova URL de rota adicionada.
      };
    }
    home(){
      
      return function(req, resp){
        //objeto represetando a  resposta, recebendo método send que recebendo uma string como parâmetro
       /*  resp.send(
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
        ); */
        resp.marko(
          templates.base.home
        );
      };
    }

    login() {

      return function(req, resp) {
          resp.marko(templates.base.login);
      };
  }

  efetuaLogin() {

    return function(req, resp) {
        // Lógica de login.

    };
  }
}
module.exports = BaseControlador;