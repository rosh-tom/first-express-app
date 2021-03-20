const express = require('express');
const path = require('path'); 
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express(); 
const PORT = process.env.PORT || 3000;

//middle ware
app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage ROute 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
})

// body parser middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

// members api routes
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})
