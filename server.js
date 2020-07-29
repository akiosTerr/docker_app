'use strict';

const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;
=======
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const SSL = process.env.PASS_SSL;
>>>>>>> c7494dbf9df0e4b0727b22bda8ab833137d9658b

let accessCount = 0;

const whitelist = [`http://${HOST}:3000`, `https://${HOST}:3000`];
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

const key = fs.readFileSync('./ssl_cert/key.pem');
// const fkey = String(key).replace(/\\n/gm, '\n');

const sslOptions = {
	key,
	cert: fs.readFileSync('./ssl_cert/server.crt'),
	passphrase: SSL,
};

// App
const app = express();
console.log(`PORT:${port}HOST:${host}`)
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

<<<<<<< HEAD
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
=======
https.createServer(sslOptions, app).listen(PORT, HOST);

console.log(`Running on https://${HOST}:${PORT}`);
>>>>>>> c7494dbf9df0e4b0727b22bda8ab833137d9658b
