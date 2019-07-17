var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var userRouter = require('./routes/user');
var imageRouter = require('./routes/image');
var mensajeRouter = require('./routes/mensaje');
var calificacionRouter=require('./routes/calificacion');
var agendaRouter=require('./routes/agenda');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1.0/ventas', indexRouter);
app.use('/v1.0/ventas/product', productRouter);
app.use('/v1.0/ventas/user', userRouter);
app.use('/v1.0/ventas/image', imageRouter);
app.use('/v1.0/ventas/mensaje',mensajeRouter);
app.use('/calificacion',calificacionRouter);
app.use('/agenda', agendaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var chatIoMethods = require('./routes/chat');

io.on('connection',chatIoMethods);

//puerto
const port = 8000;
server.listen(port, () => {
    console.log("corriendo en el puerto " + port);
});

module.exports = app;
