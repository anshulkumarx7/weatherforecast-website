const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
    const city=req.body.city;
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f0405ee3bdbe866f4d9aa509bd5ff7e8&units=metric";
    https.get(url, function(Response){
        console.log(Response.statusCode);
        Response.on("data",function(data){
            const weatherData =JSON.parse(data);
            const temp =weatherData.main.temp;
            const desc =weatherData.weather[0].description
            const icon =weatherData.weather[0].icon;
            res.write("<h1>The weather is currently "+desc+"</h1>");
            res.write("<h1>The temperature in "+city+" is :"+temp+" degree Celsius</h1>");
            res.send()
        })
    })
    

})



app.listen(3000,function(){
    console.log("Server running on port number 3000.");
})