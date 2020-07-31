//importando requirindo modulo express-validator, busca funções check pra dizer quais validações quero realizar e a validationResult que vai pegar a requisição que está chegando no nosso servidor e verificar se houve algum erro de validação. 
const { check, validationResult } = require('express-validator/check');

class Livro{ 

    static validacoes() {
      return [
        // //verificando titulo no metodo post se tem 5 caracteres e preço se esse campo tem valor monetário com express-validator. chamada para metodo withMessage se houver erro de validação que recebe uma string representando a mensagem de erro.
          check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
          check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
      ];

  };
}
module.exports = Livro;