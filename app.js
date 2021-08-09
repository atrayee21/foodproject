const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mycontact', {useNewUrlParser: true});

var orderSchema= new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    message:String

});
var Contact=mongoose.model('Contact',orderSchema);




app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
    })

app.get('/contact', (req, res)=>{
        const params = {}
        res.status(200).render('contact.pug', params);
        })

app.get('/services', (req, res)=>{
            const params = {}
            res.status(200).render('services.pug', params);
            })

   
app.post('/contact', (req, res)=>{
            var newcontact=new Contact(req.body)
                    newcontact.save().then(() => {
                        res.send("Your Order has been collected.")
                    }).catch(()=>{
                        res.status(400).send("Unsuccessful");
                    })
                });

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
    });
    