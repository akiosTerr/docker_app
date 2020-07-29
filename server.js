'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

let accessCount = 0;

var whitelist = ['http://stereoblinddev.com', 'https://stereoblinddev.com'];
var corsOptions = {
	origin: function (origin, callback) {
		console.log(origin);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback('Not allowed');
		}
	},
};

// App
const app = express();
console.log(`PORT:${port}HOST:${host}`)
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('HELLO FUCKING WORLD');
});

app.get('/api', (req, res) => {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	accessCount++;
	console.log(ip);
	res.send('api check:' + accessCount);
});

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
