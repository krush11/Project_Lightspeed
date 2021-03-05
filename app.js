const express = require('express'); 
const port = 8000;
const app = express();
const passport = require('passport');
const passpotLocal = require('./config/passport_local');
const db = require('./config/mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo').default;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));    
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/innovate_dev',
        ttl: 24 * 60 * 60,   // 1 day
        autoRemove: 'native',
        crypto: {
            secret: 'squirrel'
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error found on port ${port}: \n ${err}`);
        return;
    }
    console.log('Server up and running on port:', port);
});
