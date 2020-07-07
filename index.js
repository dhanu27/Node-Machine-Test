const express=require('express');
const app=express();
const Router=express.Router;
const port=8000;
const mongoose=require('mongoose');
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());


// set up the view engine
app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './view');

app.use('/',require('./Router'));


app.listen(port,(err)=>{
       if(err){
        console.log(err);
       } 
       else
        console.log(`Application rum on localhost${port}`);
});
