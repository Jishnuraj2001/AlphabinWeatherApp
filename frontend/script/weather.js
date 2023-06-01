const token=sessionStorage.getItem("token_user");
if(!token){
    alert("You are not Authorized,Plese login first.");
    window.location.href="../html/login.html";
}


let search_form=document.getElementById("search_form");
search_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let city=document.querySelector(".input_city").value;
    getCurrentWeatherFn(city);
    getForecastWeatherFn(city);
    document.querySelector(".input_city").value="";
})


async function getCurrentWeatherFn(city){
    try {
        let res=await fetch(`http://localhost:3400/current?city=${city}`);
        if(res.ok){
            let ans=await res.json();
            renderCurrentFn(ans.data);
        }else{
            alert("Something went wrong while fetching current weather");
        }
    } catch (error) {
        console.log(error.message);
        alert("Something went wrong while fetching current weather");
    }
}

async function getForecastWeatherFn(city){
    try {
        let res=await fetch(`http://localhost:3400/forecast?city=${city}`);
        if(res.ok){
            let ans=await res.json();
            renderForecastFn(ans.data);
        }else{
            alert("Something went wrong while fetching forecast weather");
        }
    } catch (error) {
        console.log(error.message);
        alert("Something went wrong while fetching forecast weather");
    }
}





function renderCurrentFn(data){
    let current_container=document.getElementById("current_container");
    current_container.innerHTML=null;
    current_container.innerHTML=`<div class="weather-card">
    <h1>Weather in ${data.name}</h1>
    <img class="weather-icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
    <p class="weather-description">${data.weather[0].description}</p>
    <p class="weather-temperature">${(data.main.temp - 273.15).toFixed(2)}°C</p>
    <p class="weather-details">Feels like ${(data.main.feels_like - 273.15).toFixed(2)}°C | Humidity: ${data.main.humidity}%</p>
    <p class="weather-details">Wind Speed: ${data.wind.speed} m/s | Wind Direction: ${data.wind.deg}°</p>
    <p class="weather-details">Visibility: ${data.visibility} meters | Cloudiness: ${data.clouds.all}%</p>
    <button class="add_btn">Add to Preferred</button>
</div>`;
document.querySelector(".add_btn").addEventListener("click",(event)=>{
    let obj={};
    obj.city=data.name;
    obj.icon=data.weather[0].icon;
    obj.temp=`${(data.main.temp - 273.15).toFixed(2)}°C`;
    obj.time=new Date();
    obj.description=data.weather[0].description;
    addPreferredFn(obj);
})
}


async function addPreferredFn(obj){
    try {
        let res=await fetch(`http://localhost:3400/preferred`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("token_user")
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json();
        alert(data.msg);
    } catch (error) {
        console.log(error.message);
        alert("Something went wrong while adding preferred weather");
    }
}




function renderForecastFn(data){
    let forecast_container=document.getElementById("forecast_container");
    let forecast_header=document.getElementById("forecast_header");
    forecast_header.innerText=null;
    forecast_container.innerHTML=null;
    let template_arr=data.list.map((item)=>{
        return`<div class="weather-card">
        <h3>date&time :${item.dt_txt}</h3>
        <img class="weather-icon" src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
        <p class="weather-description">${item.weather[0].description}</p>
        <p class="weather-temperature">${(item.main.temp - 273.15).toFixed(2)}°C</p>
        <p class="weather-details">Feels like ${(item.main.feels_like - 273.15).toFixed(2)}°C | Humidity: ${item.main.humidity}%</p>
        <p class="weather-details">Wind Speed: ${item.wind.speed} m/s | Wind Direction: ${item.wind.deg}°</p>
        <p class="weather-details">Visibility: ${item.visibility} meters | Cloudiness: ${item.clouds.all}%</p>
    </div>`;
    })
    forecast_header.innerText=`Forecast Weather at ${data.city.name}`;
    forecast_container.innerHTML=template_arr.join("");
}