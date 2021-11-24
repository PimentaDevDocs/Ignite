const express = require('express');

const app = express();

app.use(express.json());

app.get('/courses', (req, res) => {
    return res.json(
        [
            'Curso 1',
            'Curso 2',
            'Curso 3'
        ]
    );
});

app.get('/courses/:id', (req, res) => {
    return res.json(
        [
            'Curso 1',
            'Curso 2',
            'Curso 3'
        ]
    );
});

app.post('/courses', (req, res) => {
    return res.json('post');
});

app.put('/courses/:id', (req, res) => {
    return res.json('put');
});

app.patch('/courses/:id', (req, res) => {
    return res.json('patch');
});

app.delete('/courses/:id', (req, res) => {
    return res.json('delete');
});

app.listen(3333);
