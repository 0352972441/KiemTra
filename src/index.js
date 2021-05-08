
const express = require('express')
const request = require('request')

const router = express.Router();
const url = 'http://api.weatherstack.com/current?access_key=3e2ae37fdc65c44e373c52d71df5d71f&query='+'143'+','+'-231'+'&units=m'

router.get('/weather/today',async (req, res) => {
    request({url,json:true},(error,{body})=>{
        try {
            res.send({
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                forecastData:body.current.weather_descriptions[0]+" It is a "+body.current.temperature+" degree out.It feels like "+body.current.feelslike +" degree out"
            })
        } catch (error) {
            res.send(error)
        }
    })
})


module.exports =router