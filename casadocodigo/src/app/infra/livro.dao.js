//classe do ECMAScript 6

class LivroDao {

  constructor(db) {
      this._db = db;
  }

    adiciona(livro){
        return new Promise((resolve, reject) => {
              this._db.run(`
                    INSERT INTO LIVROS (
                            titulo,
                            preco,
                            descricao
                        ) values (?, ?, ?)
                    `,
                    [
                        livro.titulo,
                        livro.preco,
                        livro.descricao
                    ],
                    function (err) {
                        if (err) {
                            console.log(err);
                            return reject('Não foi possível adicionar o livro!');
                        }

                        resolve();
                    } 
              )

        });
    }

    lista( ) {
        return new Promise((resolve, reject) => { 
            this._db.all(
              'SELECT * FROM livros',
                  (erro, resultados) =>{

                    if(erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                  }
            )
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remove(id) {

      return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
      });
    }
}

module.exports = LivroDao;


//classe do ECMAScript 6
/* class LivroDao {
  
  // referencia ao bd, definiremos um construtor recebendo a instância db, em seguida, definiremos que  atributo _db da nossa própria classe deverá receber o parâmetro db passado para o nosso construtor
  constructor(db){
    this.db = db;
  }
  //metodo listaLivros recebendo um parâmetro que chamaremos de callback, a funcão callback no listLivros no rotas vai ser executada quando o acesso ao banco de dados terminar.
  lista(callback) {
    this._db.all(
      'SELECT * FROM livros',
      (erro, resultados) =>
      callback(erro, resultados)      
      )    
    }
  }console.log("Houve um erro");
  
  module.exports = LivroDao; */
  
  /* function(erro, resultados){
    callback(erro, resultados);
  }  acima passado essa mesma function callback com ECMAScript6 linha 10*/
  
  /* Nós iremos delegar à classe LivroDao o acesso ao banco de dados. Ela terá um método listaLivros()
  que, quando executado, fará a seleção dos livros no banco. Ao término da seleção, a classe delegará 
  ao callback, passado por listaLivros, o tratamento dos resultados ou do erro.
  
  Ainda precisamos exportar essa classe LivroDao para que possamos utilizá-la em outros módulos 
  da aplicação. O module.exports é capaz de exportar um tipo definido por uma classe, 
  e é exatamente isso que faremos:
  
  module.exports = LivroDao;
  
  Essa classe nos fornecerá toda e qualquer funcionalidade relativa aos livros no banco de dados, 
  como listagem, adição, remoção, edição, e assim por diante. 
  Desse modo, faz sentido que toda instância de LivroDao tenha uma referência 
  para o nosso banco de dados. 
      lista(callback) {
          this._db.all(
              'SELECT * FROM livros',
              (erro, resultados) =>
                  callback(erro, resultados)
      
          )
      
      } 
      
Com this, pegaremos a instância do nosso banco (_db) e executaremos o run(), um método so SQLite 
utilizado para executar, no banco de dados, instruções que não retornem nenhum resultado, 
como as instruções de inserção, deleção e atualização. Esse método receberá três parâmetros. 
O primeiro deles é a string representando a instrução que queremos executar no banco de dados 
- nesse caso, a instrução de inserção:
Aqui, estamos inserindo nos campos titulo, preco e descricao, com os valores ?, ?, ?. 
Cada uma dessas interrogações representa uma informação do nosso livro - 
ou seja, título, preço e descrição, respectivamente. Se tivéssemos mais informações, 
bastaria adicionarmos mais interrogações. Como segundo parâmetro, passaremos um array com 
as informações que substituirão essas interrogações: Repare que, no array, é necessário manter 
exatamente a mesma ordem que foi colocada na instrução de inserção, de modo que as informações 
sejam inseridas nas colunas correspondentes. O último parâmetro que passaremos é uma função
 callback que será executada ao final dessa inserção. Essa função receberá, como parâmetro, somente 
 um erro (err) - lembrando que o método run() não retorna nenhum resultado, 
 somente um erro (caso ocorra um). Em caso de erro, ele será impresso no console, 
 além de executarmos a função reject() dizendo "Não foi possível adicionar o livro!". 
 Caso contrário, simplesmente resolveremos a Promise.
      
      */