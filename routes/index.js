const router = require('express').Router();
const request = require('request'); // "Request" library
const querystring = require('querystring');

const { generateRandomString } = require('../utilities/helper');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

const stateKey = 'spotify_auth_state';

router.get('/hello', (req, res) => {
	console.log('redirect_uri', redirect_uri);
	res.send('Hello from the server!');
});

router.get('/login', function (req, res) {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	// your application requests authorization
	const scope = 'user-read-private user-read-email';
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			new URLSearchParams({
				response_type: 'code',
				client_id,
				scope,
				redirect_uri,
				state,
			}).toString(),
	);
});

router.get('/callback', function (req, res) {
	console.log('req.query', req.query);
	res.send('Callbaaaaaaaaaaack!');
});

module.exports = router;
