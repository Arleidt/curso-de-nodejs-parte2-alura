const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/usuario-dao');
const db = require('./database');

module.exports = (app) => {

    // configuração da sessão e da autenticação.
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDao = new UsuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                        .then(usuario => {
                            if (!usuario || senha != usuario.senha) {
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos!'
                                });
                            }

                            return done(null, usuario);
                        })
                        .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        };

        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    app.use(sessao({
        secret: 'node alura',
        genid: function(req) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(function (req, resp, next) {
        req.passport = passport;
        next();
    });
};



/* //Esse será o módulo responsável por receber a instância do Express e configurar toda a sessão e 
//autenticação da nossa aplicação, de modo que esse código ficará encapsulado somente em um local.

const uuid = require('uuid/v4');
const sessao = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/usuario-dao');
const UsuarioDao = require('../app/infra/usuario-dao');
const db = require('./database');
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
        const usuarioDao = new UsuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                        .then(usuario => {
                            if (!usuario || senha != usuario.senha) {
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos!'
                                });
                            }

                            return done(null, usuario);
                        })
                        .catch(erro => done(erro, false));
        }
    ));

      passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        };
    
        done(null, usuarioSessao);
    });
    
      passport.deserializeUser((usuarioSessao, done) => {
          done(null, usuarioSessao);
      });

      app.use(sessao({
        secret: 'node alura',
        genid: function(req) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next) {
      req.passport = passport;
      next();
  });
};

/* A opção genid passada para configuração da sessão representa uma
 função encarregada de gerar um identificador para cada sessão criada na aplicação.


Muito bem! Está correto! Essa opção é especialmente importante pois 
por meio dela é que definimos como será a geração de IDs para cada 
uma das sessões criadas na aplicação e precisamos ter o cuidado de 
que cada ID seja diferente um do outro! */ 