//Esse será o módulo responsável por receber a instância do Express e configurar toda a sessão e 
//autenticação da nossa aplicação, de modo que esse código ficará encapsulado somente em um local.

const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
//passport.local, que deverá ser concatenada à chamada da classe Strategy, 
//nos devolvendo a representação de uma classe que chamaremos de LocalStrategy - 
//afinal, a autenticação se dará por meio de um código que nós desenvolveremos, 
//e não por meio de terceiros. Primeiro L maiúsculo por se tratar de uma classe.
const LocalStrategy = require('passport-local').Strategy;
 

module.exports = (app) => {
    //configuração da sessão e da autenticação.
    //metodo use precisa receber umas instancia da estratégia que vai ser usado na aplicação
    passport.use(new LocalStrategy(//construtor recebe 2 parâmetros
      {
          usernameField: 'email', //primeiro parâmetro obj js dizendo quais
          passwordField: 'senha'  //campos temos que levar em consideração
      },                         //para estratégia de login
      (email, senha, done) => {

      }
  ));
}