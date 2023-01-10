//const because we don't want to value of the variable to be overriden
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// const MongoStore = require('connect-mongo')(session);

//setting up the middleware that converts scss file to css and then feeds the browser with this file
const sassMiddleware = require('node-sass-middleware');

//setting to use import and export scss files
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    secret: '',
    saveUninitialzed: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    } 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

// use express router
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});