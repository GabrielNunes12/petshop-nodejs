/* 
Using buffer
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
}) */

//using streaming

const fs = require('fs'); 
const path = require('path'); 

fs.createReadStream(`${path.dirname(__dirname)}/assets/Grooming.jpg`)
  .pipe(fs.createWriteStream(`${path.dirname(__dirname)}/assets/salcichaPeludinha.jpg`))
  .on('finish', () => { console.log('Image created') });