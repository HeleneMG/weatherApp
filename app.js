$('#formulaire').hide();
$('#formulaire').fadeIn(2000);

let resultat = document.querySelector('#result');

//changement kelvin to celsius
const convertToCelsius = (temperatureEnKelvin) => {
    return temperatureEnKelvin - 273.15;
};

//click
const userClick = document.querySelector('#userSend');
userClick.addEventListener('click', (event) => {
    event.preventDefault(); 
    resultat.innerHTML = '';
    resultat.style.display = 'block';   
    const userInput = document.querySelector('#userInput').value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=57a74934bac03f187995239f352ae3e3`;
    fetch(URL)
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                alert('error' + ' ' + response.status);
                console.log(response);
            }
        })
        .then((data) => {
            const tempInKelvin = data.main.temp;
            const tempInCelsius = Math.round(convertToCelsius(tempInKelvin));

//changement fond d'écran

        let saison = document.querySelector('.header');
        function setBackground(tempInCelsius){
        if(tempInCelsius > 27){
            saison.classList.add(".ete");
        }
        else if(18 < tempInCelsius < 27){
            saison.classList.add(".spring");
        }
        else if (10 < tempInCelsius < 18) {
            saison.classList.add(".automes");
        }
        else if (tempInCelsius < 10) {
            saison.classList.add(".hiver");
        }
    };

//fin chagement fond d'écran
            resultat.insertAdjacentHTML('beforeend', `
        <p>In ${data.name}, temperature is ${tempInCelsius}°C and ${data.weather[0].description}</p>   
    `);

        }).catch((error) => {
            console.log("voici l' erreur :" + " " + error.message);
        });

});

