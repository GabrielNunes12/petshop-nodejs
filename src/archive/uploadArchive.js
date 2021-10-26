const fs = require('fs')
const path = require('path');

fs.readFile(`${path.dirname(__dirname)}/assets/Grooming.jpg`, (erro, buffer) => { 
  if(erro) {
    throw new Error('Error while buffering the image');
  } else {
    console.log('imagem foi bufferizada')
    console.log(buffer)
  }
})