const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geo = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath =  path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
const jsPath = path.join(__dirname,'../public/js')

//
const port = process.env.PORT || 3000
//Setup path js
app.set(express.static(jsPath))

// Setup handerbar engine and view location 
app.set('views',viewsPath)
app.set("view engine",'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/kiemtra',(req,res)=>{
    res.render('kiemtra')
})

app.get('/sinh7',(req,res)=>{
    res.render('sinh6')
})

app.get('/anh7',(req,res)=>{
    res.render('anh7')
})

app.get('/anh6',(req,res)=>{
    res.render('anh6')
})

app.get('/toan7',(req,res)=>{
    res.render('anh8')
})

app.listen(port, ()=>{
    console.log("Server up on "+ port);
})