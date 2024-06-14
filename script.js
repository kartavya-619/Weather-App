
const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'b328fcf375cb38c13d2eb561665550c7';

$(document).ready(function () {
	weatherFn('Pune');
});

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
	$('#city-name').text(data.name);
	$('#temperature').html(`${data.main.temp}°C`);
	$('#description').text(data.weather[0].description);
	$('#wind-speed').html(`<span style="color: #8BC34A;">Wind Speed: ${data.wind.speed} m/s</span>`);

	// Update weather icon
	const weatherIconCode = data.weather[0].icon;
	const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
	$('#weather-icon').attr('src', weatherIconUrl);

	$('#weather-info').fadeIn();
}