const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

// req = request => requisição
// res = response => resposta
// next = when i want call another method

// app.use('/', (req, res, next) => {
//     res.status(200).send({
//         massage: "Ok, deu certo!"
//     });
// });

app.use('/produtos', rotaProdutos);

app.use('/pedidos', rotaPedidos);

module.exports = app