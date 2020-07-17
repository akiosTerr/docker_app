'use strict';

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const SSL = process.env.PASS_SSL;

let accessCount = 0;

const whitelist = [`http://${HOST}:3000`, `https://${HOST}:3000`];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			console.log(origin);
			callback(null, true);
		} else {
			callback('Not allowed by CORS');
		}
	},
};

const key = fs.readFileSync('./ssl_cert/key.pem');
// const fkey = String(key).replace(/\\n/gm, '\n');

const sslOptions = {
	key,
	cert: fs.readFileSync('./ssl_cert/server.crt'),
	passphrase: SSL,
};

// App
const app = express();

app.use(cors(corsOptions));

app.get('/', (req, res) => {
	console.log('hello');
	res.send('HELLO FUCKING WORLD');
});

app.get('/api', (req, res) => {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	accessCount++;
	console.log(ip);
	res.send('api check:' + accessCount);
});

https.createServer(sslOptions, app).listen(PORT, HOST);

console.log(`Running on https://${HOST}:${PORT}`);
