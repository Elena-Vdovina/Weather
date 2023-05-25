const cityEl = document.getElementById("city")
const temperEl = document.getElementById("temperature");
const windEl = document.getElementById("windspeed");
const winddirEl = document.getElementById("winddirection");
const weatherEl = document.getElementById("weather");

async function getIP() {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const obj = await response.json();
    const { city, latitude, longitude } = obj;
    cityEl.textContent = city;
    gerWethear(latitude,longitude);
}

async function gerWethear(latitude,longitude){
const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
const obj = await response.json();
const {current_weather} = obj;
const {temperature, weathercode, windspeed, winddirection} = current_weather;
temperEl.textContent = `Temperature: ${temperature} °C`;
windEl.textContent = `Wind speed: ${windspeed} m/s`;
winddirEl.textContent = `Wind direction: ${winddirection} °`;
switch (weathercode){
    case 0: code="Clear sky"; break;
    case 1:code="Mainly clear"; break;
    case 2:code="Mainly partly cloudy"; break;
    case 3: code="Mainly overcast"; break;
    case 45:code="Fog"; break;
    case 48: code="Depositing rime fog"; break;
    case 51:code="Drizzle: Light"; break;
    case 53:code="Drizzle: Moderate"; break;
    case 55: code="Drizzle: Dense intensity"; break;
    case 56:code="Freezing Drizzle: Light"; break;
    case 57: code="Freezing Drizzle: Dense intensity"; break;
    case 61:code="Rain: Slight"; break;
    case 63:code="Rain: Moderate"; break;
    case 65: code="Rain: Heavy intensity"; break;
    case 66:code="Freezing Rain: Light"; break;
    case 67: code="Freezing Rain: Heavy intensity"; break;
    case 71:code="Snow fall: Slight"; break;
    case 73:code="Snow fall: Moderate"; break;
    case 75: code="Snow fall: Heavy intensity"; break;
    case 77: code="Snow grains"; break;
    case 80:code="Rain showers: Slight"; break;
    case 81:code="Rain showers: Moderate"; break;
    case 82: code="Rain showers: Violent"; break;
    case 85:code="Snow showers slight"; break;
    case 86: code="Snow showers heavy"; break;
    case 95: code="Thunderstorm: Slight or moderate"; break;
    case 96:code="Thunderstorm with slight"; break;
    case 99: code="Thunderstorm with heavy hail"; break;
    default: code="Unkdown";
}

weatherEl.textContent = code;
}

getIP();
