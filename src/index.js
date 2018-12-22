const express = require('express');
const api = require('./api');
// const path = require('path');
// const env = require('dotenv').config({ path: path.resolve(__dirname, './.env') }).parsed;
// const expressSession = require('express-session');

// const bodyParser = require('body-parser');

const app = express();
app.use('/api', api);
// const host = 'http://localhost:3000/';

// Standard express setup
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(expressSession({secret: '42', saveUninitialized: false, resave: false}));
// app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end('error');
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});