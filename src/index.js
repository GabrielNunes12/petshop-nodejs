const customExpress = require('./config/customExpress');
const app = customExpress();
const connection = require('./store/connection');
const tables = require('./store/database/tables');

connection.connect(error => {
  if(error) {
    console.log(error);
  } else {
    console.log('Conectado com sucesso');
    tables.init(connection);
    app.listen(3001, () => {
      console.log('Server created');
    })
  }
});

