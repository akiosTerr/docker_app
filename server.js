'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

let accessCount = 0;

// App
const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send('HELLO FUCKING WORLD');
});

app.get('/api', (req, res) => {
	accessCount++;
	res.send('api check:' + accessCount);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
