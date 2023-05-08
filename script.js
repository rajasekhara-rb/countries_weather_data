let url = 'https://restcountries.com/v3.1/all';

let weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat=20&lon=77&appid=5f02420cc75d106d910a910ee7ab7c04"

let body = document.querySelector('body');
let container = document.createElement('div');
container.setAttribute('id', "cardsContainer");
container.setAttribute("class", "container-fluid d-flex flex-row flex-wrap alert alert-warning");
body.appendChild(container);

// function for fetching the countries data from rest countries API.
function displayCountriesDetails(obj, index) {
    let count = 1;
    obj.forEach(element => {
        element.id = count;
        let cardsContainer = document.querySelector("#cardsContainer");

        let card = document.createElement('div');
        card.setAttribute('id', 'card');
        card.setAttribute('class', 'card m-1 bg-light p-2 w-25');
        cardsContainer.appendChild(card);

        let cardImage = document.createElement('img');
        cardImage.setAttribute("class", "card-img-top");
        cardImage.src = `${element["flags"]["png"]}`;
        cardImage.alt = `${element["flags"]["alt"]}`;
        card.appendChild(cardImage);

        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', ' d-flex flex-column');
        card.appendChild(cardBody);

        let cardTitle = document.createElement('h1');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerText = `${element['name']['common']}`;
        cardBody.appendChild(cardTitle);

        let cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');
        cardText.innerText = `${element['name']['official']}`;
        cardBody.appendChild(cardText);

        let cardBtn = document.createElement('button');
        cardBtn.setAttribute('class', 'btn btn-primary');
        cardBtn.setAttribute('id', `${index}`);
        cardBtn.innerText = ` Get weather of ${element['name']['common']}`;
        card.appendChild(cardBtn);

        let lat = `${element.latlng[0]}`;
        let lng = `${element.latlng[1]}`;

        let latlng = document.createElement('p');
        latlng.innerText = `id: ${element.id} lat: ${lat} lng: ${lng}`;
        cardBody.appendChild(latlng);

        cardBtn.setAttribute('onclick', `getWeatherData("${element.id}", "${element.latlng[0]}", "${element.latlng[1]}")`);
        count++;
    });
}

// function to fetch the countries data 
async function getCountriesData() {
    try {

        let response = await fetch(url);
        let countries = await response.json();
        // console.log(countries);
        displayCountriesDetails(countries);

    } catch (error) {
        console.log(error);
    }
}
getCountriesData();

// function to get the weather data based on lat and lng 
async function getWeatherData(id, lat, lng) {
    // console.log("clicked");

    console.log(id, lat, lng);
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=5f02420cc75d106d910a910ee7ab7c04`)
        let weather = response.json();
        console.log(weather);
        // let card = document.querySelector('#card');
        // let WeatherContainer = document.createElement('div');
        // WeatherContainer.setAttribute('class', 'card-body');
        // card[id].appendChild(WeatherContainer);

        // let temp = document.createElement('h2');
        // WeatherContainer.appendChild(temp);
        // temp.innerText = `${weather.main.temp}`;

    } catch (error) {
        console.log(error);
    }
}


