//Somente criação servidor, importa arquivo com import do express
const app = require('./src/config/custom-express');

//criando servidor com método listen com primeiro parâmetro numero da porta, e segundo hostname e um callback
app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});











/** 
//importa e retorna função express
const express = require('express');

//chamando função express obtendo um objeto do tipo express,  para configurar a nossa aplicação.
const app = express();

*/
//criando servidor com metodo listen com primeiro parâmetro numero da porta, e segundo hostname e um callback
/* app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});
//criando rotas

//metodos: get 2 parametros primeiro string qual a "rota caminho", segundo função callback executada sempre que cliente fazer requisição para /
app.get('/', function(req, resp){
    //objeto represetando a  resposta, recebendo metodo send que recebendo uma string como parametro
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

});

 */



























/* *tratamento servidor responsavel receber res servidor e tratar elas e criar uma resposta a ser devolvida 
para o cliente, modulo node especifico padrão capaz de atender res e montar respostas de acordo com o protocolo 
const http = require ('http');

const servidor =  http.createServer(function(req, resp) {

    let html =  ' ';
    if (req.url == '/'){
        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `;
    } else if(req.url == '/livros'){

        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Listagem de livros </h1>
                </body> 
            </html>
        `;

    }
    //outros else if
    resp.end(html);
});
servidor.listen(3000);

/**servidor.js

const ip = 'localhost';
const porta = 3000;
http.createServer(function (req, resp) {
   resp.end('<html><body><a href="http://www.alura.com.br">Site da Alura</a></body></html>');
}).listen(porta, ip); */