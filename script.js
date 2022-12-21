const infoDiv = document.querySelector('div.info')
infoDiv.innerHTML = ""

navigator.geolocation.getCurrentPosition((position, error) => {
    if(error) console.log(error)
    else printLocation(position);
})

function printLocation(pos){
    let coords = [pos.coords.latitude, pos.coords.longitude]
    console.log(coords);
    let lati = pos.coords.latitude
    let longi = pos.coords.longitude
    let key = 'OuKDpx/uUaGsY1GFPumywA==9BRitieP73ifMqlM';
    let URL = `https://api-ninjas.com/api/weather?lat=${lati}&lon=${longi}`;
    let method = {
        mode: 'cors',
        method : 'GET',
        headers: {
          'Access-Control-Allow-Origin':'*',
            'X-Api-Key': key
        }
    }
    fetch(URL, method)
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error))
    
}
