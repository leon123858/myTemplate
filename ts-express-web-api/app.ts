import express from 'express';
import { AddressInfo } from 'net';
import { fileURLToPath } from 'url';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import d from 'debug';
import serveFavicon from 'serve-favicon';

import routes from './routes/index.js';
import users from './routes/user.js';

const debug = d('my express app');
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
//app.use(serveFavicon(__dirname + '/public/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err['status'] = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		// eslint-disable-line @typescript-eslint/no-unused-vars
		res.status(err['status'] || 500);
		res.render('error', {
			message: err.message,
			error: err,
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	// eslint-disable-line @typescript-eslint/no-unused-vars
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
	});
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
	debug(
		`Express server listening on port ${(server.address() as AddressInfo).port}`
	);
});
