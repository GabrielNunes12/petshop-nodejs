const connection = require('../store/connection');
const uploadArchive = require('../archive/uploadArchive');
class Pets {
  add(pet, res) {
    const sql = 'INSERT INTO Pets SET ?';
    uploadArchive(pet.imagem, pet.name, (error, imagePath) => {
      if(error) {
        res.status(400).json(error);
      }
      const newPet = {name: pet.name, image: imagePath};
      connection.query(sql, newPet, error => {
        if(error) {
          res.status(400).json({ error: 'Can not add a pet' });
        } else {
          res.status(200).json(newPet);
        }
      });
    });
  }
}

module.exports = new Pets;