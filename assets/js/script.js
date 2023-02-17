fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9d843596ad3105698ced71f96ac932c0')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });    