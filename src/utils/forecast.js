
const request = require('request')

const forecast = (longitude, latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3e2ae37fdc65c44e373c52d71df5d71f&query='+longitude+','+latitude+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather services!",undefined)
        }else if(body.error){
            callback("Unable to find loaction. Try later",undefined)
        }else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                forecastData:body.current.weather_descriptions[0]+" It is a "+body.current.temperature+" degree out.It feels like "+body.current.feelslike +" degree out"
            });
        }
    })
}

module.exports = forecast