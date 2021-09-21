const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
app.listen(3000, () => console.log('Server is running on port 3000'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})



app.post('/', (req, res) => {
    console.log('Post recieved')


    const query = req.body.city
    const apiKey = { APIKEY }
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey

    // send a request api to openweather to get the current weather.Then integrete it and send information to client.
    https.get(url, function(response) {
        // get the weather data from api
        console.log(response.statusCode)
        response.on('data', (d) => {
            // the data that we got are in json binary. We need to convert it
            const weatherData = JSON.parse(d)
            console.log(weatherData)

            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write('<p>The weather is currently ' + desc + '</p>')
            res.write('<h1>Temperature at ' + query + ' : ' + temp + '</h1>')
            res.write('<img src=http://openweathermap.org/img/wn/' + icon + '@2x.png>')
            res.send()
        })
    })
})