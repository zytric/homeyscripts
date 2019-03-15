function day() { return ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"][(new Date()).getDay()]; }

let wstate = {
    "Mist": { name: "Duggregn", emoji: "🌫" },
    "Fog": { name: "Dimma", emoji: "🌫" },
    "Rain": { name: "Regn", emoji: "☔" },
    "Clear": { name: "Klart", emoji: "☀" },
    "Clouds": { name: "Molnigt", emoji: "☁" },
    "Snow": { name: "Snö", emoji: "❄" },
}
let weather = await Homey.weather.getWeather();
let devices = await Homey.devices.getDevices();
let temp = _.find(devices, function (d) { return d.name === "Trädgård"; }); // <-- Your outdoor device
let deg = `${temp.capabilitiesObj.measure_temperature.value}${temp.capabilitiesObj.measure_temperature.units}`;
let ws = wstate[weather.state] ? `${wstate[weather.state].emoji} ${wstate[weather.state].name}` : weather.state;
let status = `${ws}, ${weather.temperature.toFixed(1)}°C, Trädgård: ${deg}`;

setTagValue("Weather", {type: "string", title: "Weather"}, status)
return status;
