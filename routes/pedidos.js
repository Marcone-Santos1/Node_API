const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// retorna todos os pedidos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query(
            'SELECT * FROM pedidos',
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        status: res.statusCode
                    });
                }
                return (
                    res.status(200).send({
                        message: "pedidos selecionados com sucesso",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});


// Insere um pedido
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        status: res.statusCode
                    });
                }
                return (
                    res.status(201).send({
                        message: "pedido inserido com sucesso",
                        id_pedido: resultado.insertId,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// usa o :<alguma coisa> para passar um parâmentro
router.get('/:id_pedidos', (req, res, next) => {

    const id = req.params.id_pedidos;

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('SELECT * FROM pedidos WHERE id_pedidos = ?',
            [id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        status: res.statusCode
                    });
                }
                return (
                    res.status(200).send({
                        message: "pedido selecionado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// altera um pedido
router.patch('/:id_pedidos', (req, res, nex) => {

    const id = req.params.id_pedidos;

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('UPDATE pedidos set quantidade = ? where id_pedidos = ?',
            [req.body.quantidade, id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        status: res.statusCode
                    });
                }
                return (
                    res.status(202).send({
                        message: "pedido atualizado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// exclui um pedido
router.delete('/:id_pedidos', (req, res, nex) => {

    const id = req.params.id_pedidos;

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('DELETE FROM pedidos where id_pedidos = ?',
            [id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        status: res.statusCode
                    });
                }
                return (
                    res.status(202).send({
                        message: "pedido deletado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

module.exports = router;