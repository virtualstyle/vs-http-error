'use strict';

//const fs = require("fs");
const path = require('path');
const purify = require('purify-css');
const sass = require('node-sass');
const rimraf = require('rimraf');
const fs = require("fs-extra");

const processFile = function processFile(html, filepath) {
  const vars = fs.readFileSync('src/scss/_error.scss', 'utf8');
  const scss = fs.readFileSync(filepath, 'utf8');
  const fullscss = `${vars}\n@import "import";\n${scss}`;
  //console.log(fullscss);
  fs.writeFile(
    filepath.replace('src/scss', 'build'),
    scss,
    function(err) {
      if(err) {
        return console.log(err);
      }
  });
  var css = sass.renderSync({
    data: fullscss,
    outputStyle: 'compressed',
    includePaths: [
      'src/scss'
    ],
  });

  const fixedcss = purify(html, css, {minify: true});

/*  fs.writeFile(
    filepath.replace('src/scss', 'build'),
    fixedcss,
    function(err) {
      if(err) {
        return console.log(err);
      }
  });*/

}

module.exports.bundlecss = function bundlecss() {

  if (!fs.existsSync('build/css')){
    fs.mkdirSync('build/css');
  }

  if (!fs.existsSync('build/scss')){
    fs.mkdirSync('build/scss');
  }

  fs.copyFileSync('src/scss/_main.scss', 'build/scss/_main.scss');
  fs.copyFileSync('src/scss/error.scss', 'build/scss/error.scss');

  const contents = fs.readdirSync('src/scss');
  for (var i in contents) {
    if(contents[i].indexOf('_IMG_') !== -1) {
      fs.copyFileSync(`src/scss/${contents[i]}`, `build/scss/${contents[i]}`);
    }
  }

  const { exec } = require('child_process');
  exec('node-sass --output-style expanded -o build/css build/scss', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log('ERROR', err);
      return;
    }

    const html = fs.readFileSync('src/error.template.html', 'utf8');
    const css = fs.readFileSync('build/css/error.css', 'utf8');
    const fixedcss = purify(html, css, {minify: true});

    rimraf('build/scss/*', function () {

      fs.copy('src/scss', 'build/scss', function (err) {
          if (err){
            console.log('Error copying scss');
            return console.error(err);
          }

          fs.writeFile(
            'build/scss/_main.scss',
            fixedcss,
            function(err) {
              if(err) {
                return console.log(err);
              }
          });

          let scss = fs.readFileSync('src/scss/error.scss', 'utf8');
          const exportNames = [];
          const importregex = /\/\/ Dynamic Import - do not edit\n.*\n/;
          const match = scss
            .match(importregex)[0]
            .replace(/.*Dynamic Import - do not edit\n@import / , '')
            .replace(/;\n/, '')
            .replace(/"/g, '');

          match.split(', ').forEach(f => {
            exportNames.push(f.replace('_IMG_', 'IMG_'));
          });
          const main = exportNames.pop();
          exportNames.push("jquery-ui");
          exportNames.push("pure");
          exportNames.push(main);

          let newimportlines = '// Dynamic Import - do not edit\n@import "' + exportNames.join('", "') + '";\n';
          scss = scss.replace(/\/\/ Dynamic Import - do not edit\n.*\n/, newimportlines);
          fs.writeFile(
            `build/scss/error.scss`,
            scss,
            function(err) {
              if(err) {
                return console.log(err);
              }
          });

          exec('node-sass --output-style expanded -o dist build/scss', (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              console.log('ERROR', err);
              return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`node-sass stdout: ${stdout}`);
            console.log(`node-sass stderr: ${stderr}`);
          });

      });

    });

    // the *entire* stdout and stderr (buffered)
    console.log(`node-sass stdout: ${stdout}`);
    console.log(`node-sass stderr: ${stderr}`);
  });

}

module.exports.scssImportStatement = function(fileNameToVarName) {

  // Fix import statement in error.scss
  let scss = fs.readFileSync('src/scss/error.scss', 'utf8');
  const exportNames = [];
  Object.keys(fileNameToVarName).forEach(f => {
    exportNames.push(fileNameToVarName[f].replace('_IMG_', 'IMG_'));
  });
  //exportNames.push("jquery-ui");
  //exportNames.push("pure");
  exportNames.push("main");
  let newimportlines = '// Dynamic Import - do not edit\n@import "' + exportNames.join('", "') + '";\n';
  scss = scss.replace(/\/\/ Dynamic Import - do not edit\n.*\n/, newimportlines);
  fs.writeFile(
    `src/scss/error.scss`,
    scss,
    function(err) {
      if(err) {
        return console.log(err);
      }
  });

}

module.exports.scssReplaceFilenamesWithVars = function(fileNameToVarName) {

  // Replace occurrences of filenames with the variables containing data URIs
  const contents = fs.readdirSync('src/scss');
  for (var i in contents) {
    if(!fs.lstatSync(`src/scss/${contents[i]}`).isDirectory()) {
      let scss = fs.readFileSync(`src/scss/${contents[i]}`, 'utf8');
      Object.keys(fileNameToVarName).forEach(f => {
        const regex = new RegExp("url((\'||\")*.*" + f.replace('src/', '') + "(\'||\")*)", 'g');
        const varname = 'url($' + fileNameToVarName[f].replace('_IMG_', '');
        scss = scss.replace(regex, varname);
      });
      fs.writeFile(
        `src/scss/${contents[i]}`,
        scss,
        function(err) {
          if(err) {
            return console.log(err);
          }
      });
    }
  }

}
