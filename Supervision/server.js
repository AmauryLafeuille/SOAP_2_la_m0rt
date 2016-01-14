var express = require('express')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , session = require('express-session')
    ;



// Initialize server
var app = module.exports = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(express.static(__dirname));

process.on('uncaughtException', function (err) {
    console.log(err.stack);
});

var port = process.env.NODE_PORT || 5000;
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
