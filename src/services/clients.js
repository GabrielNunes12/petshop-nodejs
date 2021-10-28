const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const faker = require('faker');

app.use(bodyParser());

app.get('/:cpf', (req, res) => {
    const { cpf } = req.params;
    res.status(200).json({
        cpf,
        name: faker.name.findName(),
        birthDate: faker.date.past(),
    })
})

app.listen(8082, () => {
    console.log('listening on port 8082');
})