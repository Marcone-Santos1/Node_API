const express = require('express');
const router = express.Router();

// retorna todos os pedidos
router.get('/', (req, res, next) => {
    return (
        res.status(200).send({
            message: "Usando o GET dentro da rota de pedidos"
        })
    );
});


// Insere um pedido
router.post('/', (req, res, next) => {
    return (
        res.status(201).send({
            message: "Usando o POST dentro da rota de pedidos"
        })
    );
});

// usa o :<alguma coisa> para passar um parâmentro
router.get('/:id_pedido', (req, res, next) => {

    const id = req.params.id_pedido;

    return (
        res.status(200).send({
            message: "Usando o GET para buscar por um pedido",
            id: id
        })
    );

});

// atualiza um pedido
router.patch('/:id_pedido', (req, res, nex) => {

    const id = req.params.id_pedido;

    return (
        res.status(200).send({
            message: "Usando o PATCH dentro da rota pedido",
            id: id
        })
    )
});

// deleta um pedido
router.delete('/:id_pedido', (req, res, nex) => {

    const id = req.params.id_pedido;

    return (
        res.status(200).send({
            message: "Usando o DELETE dentro da rota pedido",
            id: id
        })
    )
});

module.exports = router;