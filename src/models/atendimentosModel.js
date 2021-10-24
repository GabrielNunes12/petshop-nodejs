const moment = require('moment');

const connection = require('../store/connection');

class AtendimentoModel {
  add(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const isDataValida = moment(data).isSameOrAfter(dataCriacao);
    const isClienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: '',
        valido: isDataValida,
        mensagem: 'Campo data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: isClienteValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ]

    const erros = validacoes.filter(validacao => !validacao.valido);
    const isValido = erros.length;

    if(isValido) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};
      const sql = 'INSERT INTO atendimentos SET ?'
      connection.query(sql, atendimentoDatado, (error,result) => {
        if(error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      })
    }
  }
}

module.exports = new AtendimentoModel;