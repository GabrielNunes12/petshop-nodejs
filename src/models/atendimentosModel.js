const moment = require('moment');

const connection = require('../store/connection');

const axios = require('axios');

const repositories = require('../repositories/atendimentos');

class AtendimentoModel {
  constructor() {
    this.isDataValida = ({date, createdDate}) => moment(date).isSameOrAfter(createdDate);
    this.isClienteValido = (length) => length >= 5;

    this.validation = params => this.validacoes.filter(fields => {
      const { name } = fields;
      const parameter = params[name];
      return !fields.valido(parameter);
    });

    this.validacoes = [
      {
        nome: 'data',
        valido: this.isDataValida,
        mensagem: 'Campo data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: this.isClienteValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]
  }
  add(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const parameters = {
      date: { date, dateCreated },
      client: { length: atendimento.cliente.length }
    }

    const erros = this.validation(parameters);
    const isValido = erros.length;

    if(isValido) {
      return new Promise((resolve, reject) => reject(erros));
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};
      
      return repositories.add(atendimentoDatado).then((resultados) => {
        const id = resultados.insertId;
        return { ...atendimento, id };
      });
    }
  }
  lista() {
    return repositories.list()
  }
  findById(idAtendimento, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${idAtendimento}`;
    connection.query(sql, async (error, result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;
      if(error) {
        res.status(400).json(error);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        
        atendimento.cliente = data;

        res.status(200).json(atendimento);
      }
    })
  }
  changeAtendimento(id, values, res) {
    if(values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }
    const sql = 'UPDATE atendimentos SET ? WHERE id=?';
    connection.execute(sql, [values, id], (error, result) => {
      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }
  removeAtendimento(id, res) {
    const sql = 'DELETE FROM atendimentos WHERE id=?';
    connection.query(sql, id, (error, result) => {
      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({id});
      }
    })
  }
}

module.exports = new AtendimentoModel;