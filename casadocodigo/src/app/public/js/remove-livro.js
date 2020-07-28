let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if (elementoClicado.dataset.type == 'remocao') {
        let livroId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));

    }

});



/**Nesse arquivo, selecionaremos a tabelaLivros e adicionaremos nela um ouvinte para o evento de 
 * clique. Pega o evento gerado e o elemento que foi clicado(evento.target). Se o elemento que foi 
 * clicado tiver o data type remocao, saberemos que é o nosso link de remoção. 
 * Em seguida, pegaremos o dataref com o Id do nosso livro, e com a fetch() do JavaScript, 
 * faremos uma requisição para a URL /livros/${livroID} (que será um valor numérico).
Além disso, nossa requisição terá que ser feita com o método DELETE do HTTP. 
Se tivermos uma resposta positiva do servidor, removeremos a linha da tabela referente a aquele ID. 
Se houver um problema, será feito um console.log() do erro. Todo esse processo se dará do lado do 
navegador. Como serão feitas requisições para http://localhost:300/livros/${livroId}, precisaremos criar
 uma rota que consiga atender à essa requisição para o método DELETE. */