const form = document.querySelector("form");
const search = document.querySelector("#searchBar");
const submit = document.querySelector("#submitBtn");
const weather = document.querySelector("#weatherInfo");
const apikey = '6e4bd731a82096eaff601f325f1922f9';
const mapButton = document.querySelector('#mapPin');
const alertTag = document.querySelector('.alert')


mapButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
});

const locationSuccess = (pos) => {
    getWeatherCoords(pos.coords);
}

const locationError = () => {
    console.log('coords path error');
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // weather.innerHTML = "Loading ...";
    let city = search.value;
    getWeather(city);
})

const getWeatherCoords = async (coord) => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${apikey}&units=metric`;
    let resp = await fetch(URL);
    let data = await resp.json();
    console.log(data);
    return printData(data);
};

const getWeatherCity = async (city) => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    let resp = await fetch(URL);
    let data = await resp.json();
    console.log(data);
    return printData(data);
};

const printData = (data) => {
    let disc = '';
    if(data.weather.main) disc= '<div class="card-subtitle text-muted">${data.weather.main} : ${data.weather.description}</div>';  
    weather.innerHTML += 
    `
    <div class="card">
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            ${disc}
            <p class="card-text">
            Temp: ${data.main.temp} (${data.main.temp_min} to ${data.main.temp_max}) <br> 
            Feels like: ${data.main.feels_like} <br>
            Humidity: ${data.main.humidity} <br>
            </p>
        </div>
    </div>
    `
    
    return;
};

// <h3>${data.name}</h3> <br>
//     ${data.weather.main} : ${data.weather.description} <br>
//     Temp: ${data.main.temp} (${data.main.temp_min} to ${data.main.temp_max}) <br> 
//     Feels like: ${data.main.feels_like} <br>
//     Humidity: ${data.main.humidity} <br>`;        
//