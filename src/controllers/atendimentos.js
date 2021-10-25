const atendimentoModel = require('../models/atendimentosModel');
module.exports = (app) => {
  
  app.get('/atendimentos', (req, res) => {
    return atendimentoModel.lista(res);
  });

  app.get('/atendimentos/:id', (req, res) => {
    const idAtendimento = parseInt(req.params.id);
    atendimentoModel.findById(idAtendimento, res);
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;
    atendimentoModel.add(atendimento, res);
  });
}