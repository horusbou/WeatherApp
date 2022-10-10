window.addEventListener('load',()=>{
let key = '990c0d915fc8ed9297ecd4b054941f69';
let lat,lon;
let timeZoneTag = document.querySelector(".location-timezone");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureDescription = document.querySelector(".temperature-description");
let icon = document.querySelector(".icon");
let temperatureSection = document.querySelector(".degree-section");
let span = temperatureSection.querySelector('span');
//create img component for the icon
    let iconTag = document.createElement('img');

/*
* we are using if statment for the user intreaction, like if give us the permission to use gps then we are done,
* otherwise we give stop the page and showing 101 error
*/


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`

            fetch(url)
            .then(respond=>respond.json())
            .then(data=>{
                //working with only current

                // get the tempeture degree
                const temp = data.current.temp;
                //get the description of the weather
                const description = data.current.weather[0].description;
                //get the icon id
                const iconId = data.current.weather[0].icon;
                iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
                iconTag.src=iconUrl;
                icon.appendChild(iconTag)

                //set elemnts from the API
                timeZoneTag.textContent=data.timezone;
                temperatureDegree.querySelector('p').textContent = temp;
                temperatureDescription.querySelector('p').textContent = description;

                let fahrenheit = temp * 9/5 + 32;
                //change tempeter
                temperatureSection.addEventListener("click",()=>{
                    if(span.textContent == 'C'){
                        temperatureDegree.querySelector('p').textContent = fahrenheit
                        span.innerHTML = 'F'
                    }else{
                        temperatureDegree.querySelector('p').textContent = temp;
                        span.innerHTML = 'C'
                    }
                })

            })

        })
    }
})
