const fs = require('fs')
const path = require('path');

fs.readFile(`${path.dirname(__dirname)}/assets/Grooming.jpg`, (erro, buffer) => { 
  if(erro) {
    throw new Error('Error while buffering the image');
  } else {
    console.log(buffer);
    // creating a file called by name of salcichaPeludinha.jpg
    fs.writeFile(`${path.dirname(__dirname)}/assets/salcichaPeludinha.jpg`, buffer, (error)=> {
      console.log('Image created');
    })
  }
})