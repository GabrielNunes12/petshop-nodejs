const atendimentoModel = require('../models/atendimentosModel');
module.exports = (app) => {
  
  app.get('/atendimentos', (req, res) => {
    return res.send('Parabéns, está na rota de atendimentos');
  });

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;
    atendimentoModel.add(atendimento, res);
  });
}