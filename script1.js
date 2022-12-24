// const infoDiv = document.querySelector('div.info')
// infoDiv.innerHTML = ""

// navigator.geolocation.getCurrentPosition((position, error) => {
//     if(error) console.log(error)
//     else printLocation(position);
// })

// function printLocation(pos){
//     let coords = [pos.coords.latitude, pos.coords.longitude]
//     // console.log(coords);
//     let lati = pos.coords.latitude
//     let longi = pos.coords.longitude
//     let key = 'OuKDpx/uUaGsY1GFPumywA==9BRitieP73ifMqlM';
//     let URL = `https://api-ninjas.com/api/weather?lat=${lati}&lon=${longi}`;
//     let method = {
//         // mode: 'cors',
//         method : 'GET',
//         headers: {
//         //   'Access-Control-Allow-Origin':'*',
//             'X-Api-Key': key
//         }
//     }
//     fetch(URL, method)
//     .then((res) => res.json())
//     .then((data)=> console.log(data))
//     .catch(error => console.log(error));
    
// }

const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
    // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `
}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault();
    }
)