const router = require('express').Router();
const axios = require('axios'); // "axios" library
// const querystring = require('querystring');

const { generateRandomString } = require('../utilities/helper');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
const USERNAME = process.env.USERNAME; // Your redirect uri

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

	res.send('callbaack!')
	// your application requests refresh and access tokens
	// after checking the state parameter

	// const code = req.query.code || null;
	// const state = req.query.state || null;
	// const storedState = req.cookies ? req.cookies[stateKey] : null;

	// if (state === null || state !== storedState) {
	// 	res.redirect('/#' +
	// 		querystring.stringify({
	// 			error: 'state_mismatch'
	// 		}));
	// } else {
	// 	res.clearCookie(stateKey);
	// 	const authOptions = {
	// 		url: 'https://accounts.spotify.com/api/token',
	// 		form: {
	// 			code: code,
	// 			redirect_uri: redirect_uri,
	// 			grant_type: 'authorization_code'
	// 		}
	// 	};

	// 	axios.post(authOptions.url, authOptions.form,
	// 		{
	// 			headers: {
	// 				'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
	// 				'Content-Type': 'application/json',
	// 			}
	// 		})
	// 		.then(response => {
	// 			if (response.statusCode === 200) {

	// 				const access_token = body.access_token,
	// 					refresh_token = body.refresh_token;

	// 				const options = {
	// 					url: 'https://api.spotify.com/v1/me',
	// 					headers: {
	// 						'Authorization': 'Bearer ' + access_token,
	// 						'Content-Type': 'application/json'
	// 					}
	// 				};

	// 				// use the access token to access the Spotify Web API
	// 				axios.get(options.url, options.headers)
	// 					.then(({ body }) => console.log(body))
	// 					.catch(err => console.error('child', err.message))


	// 				// we can also pass the token to the browser to make requests from there
	// 				res.redirect(
	// 					'/#' +
	// 					URLSearchParams.toString({
	// 						access_token: access_token,
	// 						refresh_token: refresh_token,
	// 					}),
	// 				);
	// 			} else {
	// 				res.redirect('/#' +
	// 					URLSearchParams.toString({
	// 						error: 'invalid_token'
	// 					}));
	// 			}
	// 		})
	// 		.catch(err => console.error('parent: ', err.message))
	// }
});

router.get('/me', (req, res) => {
	const data = axios.get(`https://api.spotify.com/v1/playlists`);
	res.json(data);
})

// GET /v1/playlists/playlist_id HTTP/1.1
// Content-Type: application/json
// Authorization: 
// Host: api.spotify.com


module.exports = router;
