'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

let accessCount = 0;

const whitelist = [`http://${host}:${port}`, `https://${port}:${port}`];
const corsOptions = {
	origin: function (origin, callback) {
		console.log(origin);
		if (whitelist.indexOf(origin) !== -1) {
			console.log(origin);
			callback(null, true);
		} else {
			callback('Not allowed');
		}
	},
};

// App
const app = express();

console.log(`PORT:${port} HOST:${host}`);
app.use(cors());

app.get('/', (req, res) => {
	res.send('Testing API 123');
});

app.get('/api', (req, res) => {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	accessCount++;
	console.log(ip);
	res.send('api check:' + accessCount);
});

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
