window.onload = ()=>{
    getCurrentLocation();
}

let getCurrentLocation = () =>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
             getDataByCoords(position.coords.latitude,position.coords.longitude);
        },locationError)
    }
    else
        alert("Error in get Loaction");    
}

let locationError = (error)=>{
    alert("Error in get Loaction");
}
let getDataByCoords = async(lat,lon) =>{
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=df7b1130b51853c79a3c341a962c6461&units=metric`)
    .then(async(result)=>{
        console.log(result);
        const response = await result.json();
        console.log(response)
        useData(response)
    })
    .catch((err)=>{
        console.log(`ERROR IN API- ${err}`)
    })
}

let useData = (data_jason) =>{
    // load weather icon into html file with css
    let weather_img = document.createElement("img")
    weather_img.src = `https://openweathermap.org/img/wn/${data_jason.weather[0].icon}@2x.png`
    weather_img.className = "weatherIcon";   
    document.getElementById("weatherIcon").appendChild(weather_img);

    // load cloud info to html file
    document.getElementById("weatherCondition").innerHTML = data_jason.weather[0].description;    


    // load tempeture into html file
    document.getElementById("temperature").innerHTML = Math.round(data_jason.main.temp) + `\u00B0`;

    // load place into html file
    document.getElementById("place").innerHTML = "City: " + data_jason.name;

    // load current time to html file
    showTime(data_jason.timezone)

    
}

function showTime(time_zone){
    let d = new Date(new Date().toLocaleString("en-US", {time_zone}));   
    var h = d.getHours() 
    var m = d.getMinutes() 
    var s = d.getSeconds()
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("date").innerText = time;    
    setTimeout(showTime,1000,time_zone);
}


async function get_city_data(city_name)
{
    await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city_name+'&units=metric&appid=df7b1130b51853c79a3c341a962c6461').then(async(result)=>{
        let pockage = await result.json();
        useData(pockage);
    })
    .catch((err)=>{
        console.log(`ERROR IN API- ${err}`)
    })
}


function searchButtonClicked()
{
    get_city_data(document.getElementById("search_textbox").value);
}