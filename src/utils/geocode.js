const request = require('request')


const geo = (city,callback)=>{

    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(city) +'.json?access_token=pk.eyJ1Ijoibm9ra28xMSIsImEiOiJja21xY2tienUwNzB1MnRwaXB6MTQ5YWc3In0.JrZXxmEBtbxA-WG0QwTujw&limit=1'

    request({url:geoUrl,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to location service!",undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to find city",undefined);
        }else{
            const longitude = response.body.features[0].center[1];
            const latitude = response.body.features[0].center[0];
            const place_name = response.body.features[0].place_name;
            callback(undefined,{
                longitude:longitude,
                latitude:latitude,
                location:place_name
            })
        }
    })
} 



module.exports = geo