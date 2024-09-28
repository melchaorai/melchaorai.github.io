document.addEventListener('DOMContentLoaded',function (){
    let tempData = [];
    let humidData = [];
    let luxData = [];
    let timeData = [];

    const layout = {
        plot_bgcolor: "#080808",  // Background color of the plot area
        paper_bgcolor: "#FDA14C", // Background color of the entire chart
        font: 
            { family: 'Poppins, sans-serif',
                color: '#FFFFFF'
            }
    };

    // Initialize Plotly scatter plots with custom background
    Plotly.newPlot('chart-temperature', [{
        x: timeData,
        y: tempData,
        mode: 'markers',
        name: 'Temperature (°C)',
        marker: { color: '#FDA14C' }
    }], Object.assign({ title: '30sec-Temperature Recorded' }, layout));

    Plotly.newPlot('chart-humidity', [{
        x: timeData,
        y: humidData,
        mode: 'markers',
        name: 'Humidity (%)',
        marker: { color: '#FDA14C' }
    }], Object.assign({ title: '30sec-Humidity Recorded' }, layout));

    Plotly.newPlot('chart-lux', [{
        x: timeData,
        y: luxData,
        mode: 'markers',
        name: 'white',
        marker: { color: '#FDA14C' }
    }], Object.assign({ title: '30sec-Lux Recorded' }, layout));

    function fetchData() {
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

                const currentTime = new Date().toLocaleTimeString();
                document.querySelector('#time').innerHTML = `timestamp : ${new Date().toLocaleTimeString()}`;
                document.querySelector('#temp').innerHTML = `temperature : ${temp}`;
                document.querySelector("#humid").innerHTML =  `humidity : ${humid}`;
                document.querySelector("#lux").innerHTML = `lux : ${lux}`;
                document.querySelector("#motion").innerHTML =  `motion : ${motion}`;
                
                timeData.push(currentTime);
                tempData.push(temp);
                humidData.push(humid);
                luxData.push(lux);

                Plotly.extendTraces('chart-temperature', { y: [tempData], x: [timeData] }, [0]);
                Plotly.extendTraces('chart-humidity', { y: [humidData], x: [timeData] }, [0]);
                Plotly.extendTraces('chart-lux', { y: [luxData], x: [timeData] }, [0]);

                const maxPoints = 60;
                if (timeData.length > maxPoints) {
                    timeData.shift();
                    tempData.shift();
                    humidData.shift();
                    luxData.shift();
                }
                
            });
        }
        setInterval(fetchData,30000);
    
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
