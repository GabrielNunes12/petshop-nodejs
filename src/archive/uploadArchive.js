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
  const validTypes = [ 'jpg', 'png', 'jpeg' ];
  const extensionName = path.extname(imagePath);
  const isValidType = validTypes.indexOf(extensionName.substring(1));
  if(isValidType === -1) {
    console.log('Invalid image type');
  } else {
    const newPathImage = `${path.dirname(__dirname)}/assets/${archiveName}${extensionName}`;
    fs.createReadStream(imagePath)
      .pipe(fs.createWriteStream(newPathImage))
      .on('finish', () => { imageCreated(false,newPathImage) });
  }
}