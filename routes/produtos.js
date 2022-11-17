const express = require('express');
const router = express.Router();

// retorna todos os produtos
router.get('/', (req, res, next) => {
    return (
        res.status(200).send({
            message: "Usando o GET dentro da rota de produtos"
        })
    );
});


// Insere um produto
router.post('/', (req, res, next) => {
    return (
        res.status(201).send({
            message: "Usando o POST dentro da rota de produtos"
        })
    );
});

// usa o :<alguma coisa> para passar um parâmentro
router.get('/:id_produto', (req, res, next) => {

    const id = req.params.id_produto;

    return (
        res.status(200).send({
            message: "Usando o GET para buscar por um produto",
            id: id
        })
    );

});

// altera um produto
router.patch('/:id_produto', (req, res, nex) => {

    const id = req.params.id_produto;

    return (
        res.status(200).send({
            message: "Usando o PATCH dentro da rota produto",
            id: id
        })
    )
});

// exclui um produto
router.delete('/:id_produto', (req, res, nex) => {

    const id = req.params.id_produto;

    return (
        res.status(200).send({
            message: "Usando o DELETE dentro da rota produto",
            id: id
        })
    )
});

module.exports = router;