const connection = require('../store/connection');

class Pets {
  add(pet, res) {
    const sql = 'INSERT INTO Pets SET ?'
    connection.query(sql, pet, error => {
      if(error) {
        res.status(400).json({ error: 'Can not add a pet' });
      } else {
        res.status(200).json(pet);
      }
    });
  }
}

module.exports = new Pets;