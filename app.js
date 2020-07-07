'use strict';

const express = require('express');
const PORT = 2020;
const HOST = 'stereoblinddev.com';

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
