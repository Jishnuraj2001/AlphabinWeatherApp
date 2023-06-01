const token=sessionStorage.getItem("token_user");
if(!token){
    alert("You are not Authorized,Plese login first.");
    window.location.href="../html/login.html";
}


getPreferredFn();

async function getPreferredFn(){
    try {
        let res=await fetch(`http://localhost:3400/preferred`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("token_user")
            }
        })
        let data=await res.json();
        if(res.ok){
            renderPreferredFn(data.data);
        }else{
            alert("Something went wrong while getting preferred weather");
        }
    } catch (error) {
        console.log(error.message);
        alert("Something went wrong while getting preferred weather");
    }
}


function renderPreferredFn(arr){
    let forecast_container=document.getElementById("forecast_container");
    forecast_container.innerHTML=null;
    let template_arr=arr.map((item)=>{
        return`<div class="weather-card">
        <h1>${item.city}</h1>
        <p>date&time :${item.time}</p>
        <img class="weather-icon" src="https://openweathermap.org/img/w/${item.icon}.png" alt="${item.description}">
        <p class="weather-description">${item.description}</p>
        <p class="weather-temperature">${item.temp}</p>
    </div>`;
    })
    forecast_container.innerHTML=template_arr.join("");
}