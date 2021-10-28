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
module.exports = (imagePath, archiveName, imageCreated ) => {
  const newPathImage = `${path.dirname(__dirname)}/assets/${archiveName}`;
  fs.createReadStream(imagePath)
    .pipe(fs.createWriteStream(newPathImage))
    .on('finish', () => { imageCreated(newPathImage) });
}