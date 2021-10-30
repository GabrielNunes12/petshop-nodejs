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
    atendimentoModel.add(atendimento).then((atendimentoCreated) => {
      res.status(201).json(atendimentoCreated);
    }).catch((error) => {
      res.status(400).json(error);
    });
  });

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    atendimentoModel.changeAtendimento(id, values, res);
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    atendimentoModel.removeAtendimento(id, res);
  })
}