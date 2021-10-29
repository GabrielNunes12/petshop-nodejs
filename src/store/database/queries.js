const connection = require('./connection');

const executeQuery = (query, params = '') => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      if(error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}

module.exports = executeQuery();