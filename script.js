async function getWeather(city) {
    const api_key = "a1ae891331e567070b2525425726f9e8";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function updateWeather() {
    const city = document.getElementById('city').value;
    const data = await getWeather(city);
    console.log(data);
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const weatherImageElement = document.getElementById('weather-image');

    if (data && data.main) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        temperatureElement.textContent = `Temperature: ${temperature}°C`;
        descriptionElement.textContent = `Description: ${description}`;
        updateBackgroundAndImage(description);
    } else {
        temperatureElement.textContent = "Temperature: N/A";
        descriptionElement.textContent = "Description: N/A";
        document.body.style.backgroundImage = "url('./assets/Sun.png')";
        weatherImageElement.classList.remove('show'); // Hide the image
    }
}

function updateBackgroundAndImage(description) {
    const weatherImageElement = document.getElementById('weather-image');
    weatherImageElement.classList.remove('show'); // Reset the image

    if (description.toLowerCase().includes('rain')) {
        document.body.style.backgroundImage = "url('./assets/Rain.png')";
        weatherImageElement.src = "./assets/rainy.png";
        setTimeout(() => weatherImageElement.classList.add('show'), 50); // Delay to ensure transition
    } else {
        document.body.style.backgroundImage = "url('./assets/Sun.png')";
        weatherImageElement.src = "./assets/Sunny.png";
        setTimeout(() => weatherImageElement.classList.add('show'), 50); // Delay to ensure transition
    }
}

function checkEnter(event) {
    if (event.keyCode === 13) {
        updateWeather();
    }
}