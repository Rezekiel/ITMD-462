const express = require("express");
const path = require("path");
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

// Init middleware so the app can use it. Middleware function is in /middleware/logger.js file. We import it here
//app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs( {defaultLayout: 'main'})); //layout has to be called main.layout
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // handle form submission

// Homepage route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Members app',
        members: members
    })
});

// set static folder (needed so express can handle file types)
app.use(express.static(path.join(__dirname, "public")));

// members api Routes
app.use('/api/members', require('./routes/api/members'));


// set root director response
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
