const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geo = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

// console.log(__filename);
// console.log(__dirname);
// console.log();
// Define path for express config
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

app.get('',(req,res)=>{
    res.render("index",{
        name:"Toan",
        title: "Weather"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:"Help",
        name:"Toan"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About",
        name:"Toan"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geo(req.query.address,(error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (err, {description, temperature, feelslike, forecastData}={})=>{
            if(err){
                return res.send({
                    error: err
                })
            }
            res.send({
                forecast: forecastData,
                place_name: location,
                location: [longitude, latitude],
                address: req.query.address,
                description: description,
                temperature: temperature,
                feelslike: feelslike
            })
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Your must provide address"
        })
    }
    res.send([
        {
            title:"NodeJs",
            price: 22
        }
    ])
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:"404",
        name: 'Toan',
        errorMessage:"Help article not found."
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:"404",
        name: 'Toan',
        errorMessage: "Page not found."
    })
})

app.listen(port, ()=>{
    console.log("Server up on "+ port);
})