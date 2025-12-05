const express = require("express");
const axios = require("axios");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.render("index", {weather: null, error: null});
});
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = "70e47be81baea9888b8d18fa5162610d";
    const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try {
        const response = await axios.get(ApiUrl);
        weather = response.data;
        //console.log(response);
    } catch (error) {
        weather = null;
        error = 'Error,Please Try Again!';

    }
    res.render("index", {weather, error});
});
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

