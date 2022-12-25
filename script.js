document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector("form");
    const search = document.querySelector("#searchBar");
    const submit = document.querySelector("#submitBtn");
    const weather = document.querySelector("#weatherInfo");
    const apikey = '6e4bd731a82096eaff601f325f1922f9';
    const mapButton = document.querySelector('#mapPin');
    const alertTag = document.querySelector('.permalert')


    mapButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    });

    const locationSuccess = (pos) => {
        getWeatherCoords(pos.coords);
        alertTag.style.display = 'none';
    }

    const locationError = () => {
        // console.log(error);
        alertTag.style.display = 'flex';
    }

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        // weather.innerHTML = "Loading ...";
        let city = search.value;
        search.value = '';
        getWeatherCity(city);
    })

    const getWeatherCoords = async (coord) => {
        let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${apikey}&units=metric`;
        let resp = await fetch(URL);
        let data = await resp.json();
        console.log(data);
        return printData(data);
    };

    const getWeatherCity = async (city) => {
        alertTag.style.display = 'none';
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        let resp = await fetch(URL);
        let data = await resp.json();
        console.log(data);
        return printData(data);
    };

    const printData = (data) => {
        let disc = '';
        if(data.weather.main) disc= '<div class="card-subtitle text-muted">${data.weather.main} : ${data.weather.description}</div>';  
        let colour = getTempColour(data.main.temp);
        weather.innerHTML += 
        `
        <div class="card" style="background: ${colour};">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
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

    const getTempColour = (temp) => {
        if(temp > 35){
            return '#ff8c00';
        }
        else if(temp > 24){
            return '#ffd417';
        }
        else if(temp > 10){
            return '#14ccff';
        }
        else{
            return '#0066ff';
        }
    }


    // <h3>${data.name}</h3> <br>
    //     ${data.weather.main} : ${data.weather.description} <br>
    //     Temp: ${data.main.temp} (${data.main.temp_min} to ${data.main.temp_max}) <br> 
    //     Feels like: ${data.main.feels_like} <br>
    //     Humidity: ${data.main.humidity} <br>`;        
    //
});