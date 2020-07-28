// Compiled using marko@4.22.1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/casadocodigo$1.0.0/src/app/views/livros/lista/lista.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer")),
    _preferred_script_location_tag = marko_loadTag(require("marko/src/core-tags/components/preferred-script-location-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=utf-8></head><body><h1> Listagem de livros </h1><table id=livros><tr><td>ID</td><td>Título</td><td>Preço</td><td>Editar</td><td>Remover</td></tr>");

  var $for$0 = 0;

  marko_forOf(data.livros, function(livro) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<tr" +
      marko_attr("id", "livro_" + (livro.id == null ? "" : livro.id)) +
      "> <td>" +
      marko_escapeXml(livro.id) +
      "</td><td>" +
      marko_escapeXml(livro.titulo) +
      "</td><td>" +
      marko_escapeXml(livro.preco) +
      "</td><td><a" +
      marko_attr("href", "/livros/form/" + (livro.id == null ? "" : livro.id)) +
      ">Editar</a></td> <td><a href=#" +
      marko_attr("data-ref", livro.id) +
      " data-type=remocao>Remover</a></td> </tr>");
  });

  out.w("</table> <script src=/estatico/js/remove-livro.js>\r\n        </script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "20");

  _preferred_script_location_tag({}, out);

  out.w("</body> </html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/casadocodigo$1.0.0/src/app/views/livros/lista/lista.marko",
    tags: [
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer",
      "marko/src/core-tags/components/preferred-script-location-tag"
    ]
  };
