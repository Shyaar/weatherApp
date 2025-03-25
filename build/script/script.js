let search = document.getElementById("searchBar");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let searchBtn = document.getElementById("search");
let error = document.getElementById('error')

function clearErr(id){
    error.style.display = 'none'
}

let getUserLatitude = navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    let lon = position.coords.longitude
    let lat = position.coords.latitude
    getCurrentUser(lon,lat)
  });

async function getCurrentUser (lon,lat){
    let location = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);

    let city = await location.json();
    console.log(city)
    city = city.address.state
    console.log(city)
    await checkWeather(city)
} 
  


  


const url ="https://api.openweathermap.org/data/2.5/weather?"

const key ="3a6b92ed9e84386a02dde63e36b1c176"
const metric ="units=metric";

async function checkWeather(searchCity) {
  const response = await fetch(`${url}q=${searchCity}&appid=${key}&${metric}`);
  let data = await response.json();

  let today = new Date()
  let time = `${today.getHours()-12}:${today.getSeconds()}`
  let month = today.toLocaleString('en-US', { month: 'long' });
  let day = today.getUTCDate()
  let dateToday = `${month} ${day} ${time}`

  if(response.status == 404){
    error.style.display = 'block'
  }

  date.textContent = dateToday;
  temp.textContent = `${Math.floor(data.main.temp)}°C`;
  city.textContent = data.name;
  humidity.textContent = `${data.main.humidity} %`;
  wind.textContent = `${data.wind.speed} km/h`;
}

searchBtn.addEventListener("click", () => {
  let searchCity = document.getElementById("searchBar").value;

  console.log(searchCity);
  if (searchCity) {
    checkWeather(searchCity);
  }
});






