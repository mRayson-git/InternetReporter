const express = require('express')
const path = require('path');
const cors = require('cors')
var exphbs  = require('express-handlebars');


// Start up the bash script
var exec = require('child_process').exec;
exec('./bash_scripts/main.sh');

// Start the application
const app = express();

// Enable middlewares
app.use(cors())

// Enable express-handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/logviewer', require('./routes/logviewer'));
app.use('/logOverview', require('./routes/logOverview'));
app.use('/graph', require('./routes/graph'));

app.listen(3000);

