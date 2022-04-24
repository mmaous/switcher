/**
 * For more information, read
 * https://developer.spotify.com/web-api/
 */

require('dotenv').config();
const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { reqLogger } = require('./utilities/helper');
const PORT = process.env.PORT || 5000;

const app = express();


app
	.use(cors())
	.use(cookieParser())
	.use(reqLogger);

  app.use('/', router)

console.log('Listening on', PORT);
app.listen(PORT);
