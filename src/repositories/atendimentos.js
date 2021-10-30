const executeQuery = require('../store/database/queries');

class Atendimento {
    add(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';
        return executeQuery(sql, atendimento);
    }
}

module.exports = new Atendimento();