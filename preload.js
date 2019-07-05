// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  for (const versionType of ["chrome", "electron", "node"]) {
    document.getElementById(`${versionType}-version`).innerText =
      process.versions[versionType];
  }
});

// --------- Aqui mora a Gambiarra! ---------
//  listei os arquivos do diretorio music
//-------------------------------------------
var fs = require("fs");
var domain = require("domain").create();
fs.readdir("./music", function(error, files) {
  gravar(files); // aqui chamo a função de gravar
});

domain.on("error", function(erros) {
  console.log(erros);
});

function gravar(data) {
  var json = { music: [] }; // crio um objeto js
  json.music = data; // adiciono a lista de diretórios na chave music

  // JSON.stringify(json) é a string em forma de json - node é uma coisa linda!

  fs.writeFile("list.json", JSON.stringify(json), err => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}
