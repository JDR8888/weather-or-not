var lat ="";
var lon ="";
searchBox = $("#search-box");
searcher = $("#searcher");
saver = $(".btn");
cityList = $("#selectable");

// take the name of the city typed in by the user and get the lat and lon returned
// function getCoords()

fetch('http://api.openweathermap.org/geo/1.0/direct?q=new-york&limit=5&appid=9d843596ad3105698ced71f96ac932c0')
    .then(function (response) {
        return response.json();
    }) // get the data
    .then(function (data) {
        // console.log('here is what we get from geo api:');
        // console.log(data);
        lat = lat.concat(data[0].lat);
        // lat = (lat).substring(0,3);
        
        //going with first index of values returned as the first options seems to like the best choice, just looking at some examples. getting the lat value and storing it, same with the .lon value
        lon = lon.concat(data[0].lon);
        lat = lat.substring(0,5);
        // console.log(lat);
        // lon = lon.substring(0,7)
        // console.log(lon);
        // console.log(data[0].name);
        // console.log(data[0].state);
    });  

fetch('http://api.openweathermap.org/data/2.5/weather?lat=40.71&lon=-74.006&appid=9d843596ad3105698ced71f96ac932c0')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log("here what we get from weather using the lat and lon from geo: ")
        // console.log(data);
    });    

$(saver).on('click', saver, function(event) {
    event.preventDefault();
    event.stopPropagation();
    city = $(searcher).val();
    let newCity = document.createElement("li");
    $(newCity).text(city);
    document.getElementById("selectable").appendChild(newCity);
    $(newCity).attr('id', city);
    // getCoords(); //take the user input and get lat & lon
});
 
