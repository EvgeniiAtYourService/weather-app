const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extension: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const apiKey = "ac1d6e5517a67a3222c49923f0a19df6"; //authentication
  const query = req.body.cName; //parametrs
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = Math.round(weatherData.main.temp);
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      const image = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write("<p style='text-align: center; font-size: 4rem; margin: 2rem auto;'>Currently in " + query + ": " + temp + " degrees Celcium and " + description + "</p>");
      res.write("<img src=" + image + " style='width: 30%; margin-left: 8.5rem;'>");
      res.write("<img src=" + image + " style='width: 30%;'>");
      res.write("<img src=" + image + " style='width: 30%;'>");
      res.send();
    });
  });
});







app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running on port 3000");
});
