#!/bin/bash

function reset {
  rm -rf dist
  mkdir dist
}

function buildjs {

  COUNTER=0
  FILE="npm_package_us_virtualstyle_jsfiles_${COUNTER}"
  CMD='uglifyjs --compress --mangle --output dist/error.js -- '

  while [ ${!FILE} ]; do
     CMD="$CMD ${!FILE}"
     let COUNTER=COUNTER+1
     FILE="npm_package_us_virtualstyle_jsfiles_${COUNTER}"
  done

  eval $CMD

}

function buildcss {

  node-sass --output-style compressed -o dist/ src/scss
}

function buildhtml {

  concat-cli -f src/pagetop.html dist/error.css src/pagemid.html dist/error.js src/pagebot.html -o dist/error.html
  cp -R src/images dist
}

# run our functions
reset
buildjs
buildcss
buildhtml
