// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  for (const versionType of ["chrome", "electron", "node"]) {
    document.getElementById(`${versionType}-version`).innerText =
      process.versions[versionType];
  }
});

var fs = require("fs");
var domain = require("domain").create();
fs.readdir("./music", function(error, files) {
  gravar(files);
});

domain.on("error", function(erros) {
  console.log(erros);
});

function gravar(data) {
  var json = { music: [] };
  json.music = data;

  fs.writeFile("list.json", JSON.stringify(json), err => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}
