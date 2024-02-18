const fs = require('node:fs/promises')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/meals', async (req, res, next) => {
    const mealsFileContent = await fs.readFile('./meals.json');

    const data = JSON.parse(mealsFileContent);

    res.send({ data });
})

app.get('/api/orders', async (req, res, next) => {
    const ordersFileContent = await fs.readFile('./orders.json');

    const data = JSON.parse(ordersFileContent);

    res.send({ data })
})

app.post('/api/add-order', async (req, res, next) => {
    // const ordersFileContent = await fs.readFile('./orders.json');

    console.log(`Request: ${req.body}`);
})


app.listen(8080);