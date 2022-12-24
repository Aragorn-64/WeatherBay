const form = document.querySelector("form");
const search = document.querySelector("#searchBar");
const submit = document.querySelector("#submitBtn");
const weather = document.querySelector("#weatherInfo");
const apikey = '6e4bd731a82096eaff601f325f1922f9';

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    weather.innerHTML = "Loading ...";
    let city = search.value;
    getWeather(city);
})

const getWeather = async (city) => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    let resp = await fetch(URL);
    let data = await resp.json();
    console.log(data);
    return printData(data);
};

const printData = (data) => {
    weather.innerHTML = 
    `<h3>${data.name}</h3> <br>
    ${data.weather.main} : ${data.weather.description} <br>
    Temp: ${data.main.temp} (${data.main.temp_min} to ${data.main.temp_max}) <br> 
    Feels like: ${data.main.feels_like} <br>
    Humidity: ${data.main.humidity} <br>`;
    return;
};

                