const express = require('express');
require('./db/connection');
const router = require("./routes/router");
const path = require("path");
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;
const static_path = path.join(__dirname , "./public");
console.log(static_path);

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));
app.use((req, resp, next) => {
    resp.locals.message;
    delete req.session.message;
    next();
})

app.set('view engine' , "ejs");

app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/',router);

app.listen(port , ()=> console.log(`server is running on port ${port}`));