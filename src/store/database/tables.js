class Tables {
  init(connection) {
    this.connection = connection;

    this.createAtendimento();
    this.createPet();
  }
  createAtendimento() {
    const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL
      AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20),
      servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL,
      observacoes text, PRIMARY KEY(id))`;
    this.connection.query(sql, error => {
      if(error) {
        console.log(error);
      } else {
        console.log('Atendimento table created successfully')
      }
    });
  }
  createPet() {
    const sql = `CREATE TABLE IF NOT EXISTS 
      Pets(id int NOT NULL AUTO_INCREMEN, name varchar(50), imagem varchar(200) PRIMARY KEY (id))`;
    this.connection.query(sql, error => {
      if(error) {
        console.log(error);
      } else {
        console.log(`Pets table created`);
      }
    })
  };
}
module.exports = new Tables;