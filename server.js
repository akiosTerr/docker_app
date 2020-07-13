'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

let accessCount = 0;

var whitelist = [`http://${HOST}:3000`];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			console.log(origin);
			callback(null, true);
		} else {
			callback('Not allowed by CORS');
		}
	},
};

// App
const app = express();

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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
