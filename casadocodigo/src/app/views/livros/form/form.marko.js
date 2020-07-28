// Compiled using marko@4.22.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/casadocodigo$1.0.0/src/app/views/livros/form/form.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer")),
    _preferred_script_location_tag = marko_loadTag(require("marko/src/core-tags/components/preferred-script-location-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><body><h1>Cadastro de livros</h1><form action=/livros method=post>");

  if (data.livro.id) {
    out.w("<div><input type=hidden name=_method value=PUT><input type=hidden id=id name=id" +
      marko_attr("value", data.livro.id) +
      "></div>");
  }

  out.w("<div><label for=titulo>Titulo:</label><input type=text id=titulo name=titulo" +
    marko_attr("value", data.livro.titulo) +
    " placeholder=\"coloque o titulo\"></div><div><label for=preco>Preço:</label><input type=text id=preco name=preco" +
    marko_attr("value", data.livro.preco) +
    " placeholder=150.25></div><div><label for=descricao>Descrição:</label><textarea cols=20 rows=10 id=descricao name=descricao placeholder=\"fale sobre o livro\">" +
    marko_escapeXml(data.livro.descricao) +
    "</textarea></div><input type=submit value=Salvar></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "17");

  _preferred_script_location_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/casadocodigo$1.0.0/src/app/views/livros/form/form.marko",
    tags: [
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer",
      "marko/src/core-tags/components/preferred-script-location-tag"
    ]
  };
