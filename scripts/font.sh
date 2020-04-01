#! /bin/bash

if [ ! -d "./node_modules/pdfmake" ]
then
  npm i
fi

cp -r ./examples ./node_modules/pdfmake
cd ./node_modules/pdfmake
npm i
./node_modules/.bin/gulp buildFonts
