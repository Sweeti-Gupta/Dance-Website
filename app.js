const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/danceContact', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 80;

// Defining mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String
});

//   Compiling schema into a model
var contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded()) //To bring form data to express

// EJS SPECIFIC STUFF
app.set('view engine', 'ejs') //Set the template engine to ejs
app.set('views', path.join(__dirname, 'views')) //Set the views directory
app.engine('html', require('ejs').renderFile); //For rendering html files


//  ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.html', params);
})

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.html', params);
})

app.post('/contact', (req, res) => {
    const data = new contact(req.body);
    data.save().then(() => {
        res.send("Thanks for contacting us. Your response has been saved.")
    }).catch(() => {
        res.status(400).send("Sorry for then inconvenience! Please try after some time.")
    });

})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application has started successfully on ${port}`);
})
