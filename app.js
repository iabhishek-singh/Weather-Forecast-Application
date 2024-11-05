const searchBox = document.querySelector(".inputDiv input"); //Search Box
const searchBtn = document.querySelector(".inputDiv button"); //Input Button
const weatherIcon = document.querySelector(".wetherImage"); //For wether Image


const apikey = "664197ae1ba994280107e76d9578e89f"; //API KEY 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // URL for current data fetch
// Four days data
const hourly = "https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric&q";
async function checkWeather(city) {
    // Current data(current)
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)
    var data = await response.json();
    console.log(data);
    // 4 days data (hourly)
    const responseTwo = await fetch(hourly + city + `&appid=${apikey}`)
    var datahourly = await responseTwo.json();
    console.log(datahourly);

    // check Respons Code wether is correcr or not.
    if (response.status && responseTwo == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".hourly").style.display = "none";
        document.querySelector(".wether").style.display = "none";
    } else {
        // current
        document.querySelector(".city").innerHTML = data.name + " " + data.sys.country + "<br>Feels like <br>" + data.main.feels_like;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        // hourly
        document.querySelector(".hourly").innerHTML = datahourly.name + " " + datahourly.sys.country + "<br>Feels like <br>" + datahourly.main.feels_like;
        document.querySelector(".hourly").innerHTML = Math.round(datahourly.main.temp) + "°c";
        document.querySelector(".hourly").innerHTML = datahourly.main.humidity + "%";
        document.querySelector(".hourly").innerHTML = Math.round(datahourly.wind.speed) + " km/h";

        // Upadate image based on weather
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "cloude.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.webp";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".wether").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".hourly").style.display = "none";
    }


};
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
