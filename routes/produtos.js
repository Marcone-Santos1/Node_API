const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// retorna todos os produtos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query(
            'SELECT * FROM produtos',
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
                        message: "Produtos selecionados com sucesso",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});


// Insere um produto
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
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
                        message: "Produto inserido com sucesso",
                        id_produto: resultado.insertId,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// usa o :<alguma coisa> para passar um parâmentro
router.get('/:id_produto', (req, res, next) => {

    const id = req.params.id_produto;

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('SELECT * FROM produtos WHERE id_produto = ?',
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
                        message: "Produto selecionado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// altera um produto
router.patch('/', (req, res, nex) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('UPDATE produtos set nome = ?, preco = ? where id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
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
                        message: "Produto atualizado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

// exclui um produto
router.delete('/', (req, res, nex) => {

    mysql.getConnection((error, conn) => {

        if (error) return res.status(500).send({ error: error });

        conn.query('DELETE FROM produtos where id_produto = ?',
            [req.body.id_produto],
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
                        message: "Produto deletado com sucesso!",
                        resultado,
                        status: res.statusCode
                    })
                );
            }
        );
    });
});

module.exports = router;