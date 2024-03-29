const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const blogmodel = require('./Models/blogmodel');
const articlerouter = require('./routes/routearticle');
const methodOverride = require('method-override');

const app = express();

app.set('view engine','ejs') 
 
app.use(bodyparser.urlencoded({extended : true }));
app.use(bodyparser.json())

app.use(methodOverride('_method'))

app.use('/articles',articlerouter)

dotenv.config(); 

const username = process.env.MONGODB_USERNAME ;
const password = process.env.MONGODB_PASSWORD ;


mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jzerybf.mongodb.net/registrationFormDB`)

app.get('/',async (req,res) => {

    const data =   await blogmodel.find()
   console.log(data);
   res.render('display',{articles : data})
   
})


app.listen(3000 , () => {
    console.log("app running on port 3000");
})
   
