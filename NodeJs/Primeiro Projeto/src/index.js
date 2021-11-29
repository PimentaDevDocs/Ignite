const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

const costumers = [];

app.use(express.json());

function verifyIfExistsAccount(req, res, next) {
    const { cpf } = req.headers;

    if (!cpf) {

        return res.status(400).json({ error: 'Missing required fields' });
    }

    const costumer = costumers.find(c => c.cpf === cpf);

    if (!costumer) {
        return res.status(400).json({ error: `Account not found '${ costumers }' '${ cpf }'` });
    }

    req.costumer = costumer;

    return next();
}

function getBalance(statement) {
    return statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        }
        return acc - operation.amount;
    }, 0);
}

app.get('/statement', verifyIfExistsAccount, (req, res) => {

    const { costumer } = req;

    return res.json(costumer.statement);

});

app.get('/statement/date', verifyIfExistsAccount, (req, res) => {

    const { date } = req.query;

    const { costumer } = req;

    const dateFormated = new Date(date + ' 00:00');

    const statement = costumer.statement.filter(statement => statement.createdAt.toDateString() === new Date(dateFormated).toDateString());

    return res.json(statement);

});

app.get('/account', verifyIfExistsAccount, (req, res) => {

    const { costumer } = req;

    return res.json(costumer);

});

app.get('/balance', verifyIfExistsAccount, (req, res) => {

    const { costumer } = req;

    const balance = getBalance(costumer.statement);

    return res.json({ balance });

});

app.post('/account', (req, res) => {

    const { cpf, name } = req.body;

    if (!cpf || !name) {

        return res.status(400).json({ error: 'Missing required fields' });
    }

    const costumerExists = costumers.find(costumer => costumer.cpf === cpf);

    if (costumerExists) {

        return res.status(400).json({ error: 'Customer already exists' });
    }

    const id = uuidV4();

    costumers.push({ id, cpf: cpf + '', name, statement: [] });

    return res.status(201).send();

});

app.post('/deposit', verifyIfExistsAccount, (req, res) => {

    const { description, amount } = req.body;

    const { costumer } = req;

    const statementOperation = {
        description,
        amount,
        createdAt: new Date(),
        type: 'credit'
    }

    costumer.statement.push(statementOperation);

    return res.status(201).send();

});

app.post('/withdraw', verifyIfExistsAccount, (req, res) => {

    const { amount } = req.body;

    const { costumer } = req;

    const balance = getBalance(costumer.statement);

    if (balance < amount) {

        return res.status(400).json({ error: 'Insufficient founds' });
    }

    const statementOperation = {
        amount,
        createdAt: new Date(),
        type: 'debit'
    }

    costumer.statement.push(statementOperation);

    return res.status(201).send();

});

app.put('/account', verifyIfExistsAccount, (req, res) => {

    const { name } = req.body;

    const { costumer } = req;

    costumer.name = name;

    return res.status(200).send();

});

app.delete('/account', verifyIfExistsAccount, (req, res) => {

    const { costumer } = req;

    const index = costumers.indexOf(costumer);

    costumers.splice(index, 1);

    return res.status(200).send().json(costumers);

});

app.listen(3333);
