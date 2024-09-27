document.addEventListener('DOMContentLoaded',function (){
    fetch('https://206.189.146.138/api/sensors')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const time = data.timestamp;
        const temp0 = data.temperature;
        let temp = temp0.toFixed(2);
        const humid0 = data.humidity;
        let humid = humid0.toFixed(2);
        const lux0 = data.luxsensor;
        let lux = lux0.toFixed(2);
        const motion = data.motion;
        document.querySelector('#time').innerHTML = `timestamp : ${time}`;
        document.querySelector('#temp').innerHTML = `temperature : ${temp}`;
        document.querySelector("#humid").innerHTML =  `humidity : ${humid}`;
        document.querySelector("#lux").innerHTML = `lux : ${lux}`;
        document.querySelector("#motion").innerHTML =  `motion : ${motion}`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function (event) {
        event.preventDefault();
        const name = document.querySelector('#name').value; 
        const id = document.querySelector('#id').value; 
        fetch("https://206.189.146.138/api/students", { 
            method: "POST", 
            body: JSON.stringify({ 
                id: id, 
                name: name
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(json); 
            alert(`Data submitted: ${json.name} with ID ${json.id}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }; 
});
