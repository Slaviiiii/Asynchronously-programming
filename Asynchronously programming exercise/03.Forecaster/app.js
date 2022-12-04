function attachEvents() {
    let location = document.getElementById('location');
    let submitBtn = document.getElementById('submit');
    let forecasterDiv = document.getElementById('forecast');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;
    
    let sunny = '&#x2600';
    let partlySunny = '&#x26C5';
    let overcast = '&#x2601';
    let rain = '&#x2614';
    let degrees = '&#176';
     
    let upcomingDivElement = document.createElement('div');
    let currentDivElement = document.createElement('div');

    submitBtn.addEventListener('click', (e) => {
        upcomingDivElement.innerHTML = '';
        currentDivElement.innerHTML = '';
        
        upcomingDivElement.setAttribute('class', 'forecast-info');
        currentDivElement.setAttribute('class', 'forecasts');

        fetch(url) 
        .then(response => response.json())
        .then(data => {
            let locationObj = data.find(obj => obj.name === location.value);
            if(locationObj === undefined) {
                return;
            }
            let url = `http://localhost:3030/jsonstore/forecaster`;

            fetch(`${url}/today/${locationObj.code}`)
            .then(response => response.json())
            .then(data => {
               let spanData = document.createElement('span');
               let spanConditionSymbol = document.createElement('span');
               let spanCondition = document.createElement('span');
               let spanLocation = document.createElement('span');
               let spanTemperature = document.createElement('span');

               spanConditionSymbol.setAttribute('class','condition symbol');                         
               spanData.setAttribute('class','condition');          
               spanCondition.setAttribute('class', 'forecast-data')         
               spanLocation.setAttribute('class', 'forecast-data');
               spanTemperature.setAttribute('class', 'forecast-data');

               spanLocation.textContent = data.name;
               spanTemperature.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
               spanCondition.textContent = data.forecast.condition;
               
               let condition = data.forecast.condition;
               if(condition === 'Sunny') {
                 spanConditionSymbol.innerHTML = sunny;
               } else if(condition === 'Partly sunny') {
                spanConditionSymbol.innerHTML = partlySunny;
               } else if(condition === 'Overcast') {
                spanConditionSymbol.innerHTML = overcast;
               } else if(condition === 'Rain') {
                spanConditionSymbol.innerHTML = rain;    
               } else if(condition === 'Degrees') {
                spanConditionSymbol.innerHTML = degrees;
               }
               spanData.appendChild(spanLocation);
               spanData.appendChild(spanTemperature);
               spanData.appendChild(spanCondition);
               currentDivElement.appendChild(spanConditionSymbol);
               currentDivElement.appendChild(spanData);

               currentDiv.appendChild(currentDivElement);
               forecasterDiv.style.display = 'block';
               
            })
            .catch(error => console.log(error)); 

            fetch(`${url}/upcoming/${locationObj.code}`)
            .then(response => response.json())
            .then(data => {
                let nextDays = data.forecast;
                
               nextDays.forEach(x => { 
               let spanData = document.createElement('span');
               let spanConditionSymbol = document.createElement('span');
               let spanCondition = document.createElement('span');
               let spanTemperature = document.createElement('span');

               spanConditionSymbol.setAttribute('class', 'symbol');                         
               spanData.setAttribute('class','upcoming');          
               spanCondition.setAttribute('class', 'forecast-data')         
               spanTemperature.setAttribute('class', 'forecast-data');

               spanTemperature.innerHTML = `${x.low}${degrees}/${x.high}${degrees}`;
               spanCondition.textContent = x.condition;
               
               let condition = x.condition;
               if(condition === 'Sunny') {
                 spanConditionSymbol.innerHTML = sunny;
               } else if(condition === 'Partly sunny') {
                spanConditionSymbol.innerHTML = partlySunny;
               } else if(condition === 'Overcast') {
                spanConditionSymbol.innerHTML = overcast;
               } else if(condition === 'Rain') {
                spanConditionSymbol.innerHTML = rain;    
               } else if(condition === 'Degrees') {
                spanConditionSymbol.innerHTML = degrees;
               }
               spanData.appendChild(spanConditionSymbol);
               spanData.appendChild(spanTemperature);   
               spanData.appendChild(spanCondition); 
               upcomingDivElement.appendChild(spanData);
               upcomingDiv.appendChild(upcomingDivElement);
            }) 
            })
        });   

    });  
}

attachEvents(); 