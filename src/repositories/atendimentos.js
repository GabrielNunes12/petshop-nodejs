const executeQuery = require('../store/database/queries');

class Atendimento {
    add(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';
        return executeQuery(sql, atendimento);
    }
    list() {
        const sql = 'SELECT * FROM atendimentos';
        return executeQuery(sql);
    }
}

module.exports = new Atendimento();