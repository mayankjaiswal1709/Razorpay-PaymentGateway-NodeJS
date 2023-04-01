const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
app.get('env');
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index,'));
app.use('/checkout', require('./routes/razorpay'));


console.log('helo mj env is running', process.env.port);
app.listen(process.env.port, (req, res) => {
    console.log(`server is running on port :${process.env.port}`);
})