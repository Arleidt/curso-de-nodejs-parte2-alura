//Importação de templates, um objeto JavaScript template contendo todos os templates da nossa aplicação. declararemos um módulo a ser exportado, 
//que na realidade consistirá em um objeto JavaScript contendo todos os templates dentro da pasta "base" - lembrando que um objeto desse tipo é composto 
//por uma chave e um valor. 

module.exports = {
  erro404: require('./erros/404.marko'),
  erro500: require('./erros/500.marko'),
  home: require('./home/home.marko')
}