var lat ="";
var lon ="";
var searchBox = $("#search-box");
var searcher = $("#searcher");
var saver = $(".btn");
var cityList = $("#selectable");
var weatherURL ='';
var city = '';
let today = dayjs();
$(".weather-date").text(today.format('[Today is] D MMM YYYY'));
// take the name of the city typed in by the user and get the lat and lon returned

function getCoords(city) {
    lat = ''; //reset lat & lon so we're not just appending the next lat/lon
    lon = '';
    $(".city-name").text(city);
    coordsURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9d843596ad3105698ced71f96ac932c0`
    fetch(coordsURL)
        .then(function (response) {
            return response.json();
        }) 
       .then(function (data) {
        $(".weather-city").text(city);
        lat = lat.concat(data[0].lat);
        lat = (lat).substring(0,5);        
        //going with first index of values returned as the first options seems to like the best choice, just looking at some examples. getting the lat value and storing it, same with the .lon value
        lon = lon.concat(data[0].lon);
        lon = lon.substring(0,5);
        //now that i've extracted the lat/lon, i will make another api call for the current weather by plugging in the lat/long i got into the api url to call in the next function
          weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d843596ad3105698ced71f96ac932c0&units=imperial`;
          //i will make another api variable to take the exact same lat/lon combo but it will call the 5-day forecast insteaed of the current weather
          forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9d843596ad3105698ced71f96ac932c0&units=imperial`;
        // console.log(weatherURL);
           getWeather(weatherURL);
           getForecast(forecastURL);
       });  
};
function getWeather(weatherURL) { //take url passed from getcoords function
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
         //get temp, wind, humidity from data and put in card
            $(".weather-temp").text('temperature: '+ data.main.temp + '\u2109');
            $(".weather-wind").text('wind speed: '+ data.wind.speed +'mph');
            $(".weather-humidity").text('humidity: '+ data.main.humidity +'%');
            let iconID = data.weather[0].icon; //figure out what icon based on data from api
            iconSource = `https://openweathermap.org/img/wn/${iconID}@2x.png`; //use the url with id of icon and set it as the source for weather icon id
            $("#wicon").attr('src', iconSource);
            $("#wicon").attr('alt', "weather icon");
        }); //ends my then-statement (once data is there)
        weatherURL = ''; 
        lat = ''; //reset lat & lon so we're not just appending the next lat/lon
        lon = '';
 
};  //ends getWeather function

function getForecast(forecastURL) {
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.list.length);
            for (i = 1; i < data.list.length;) {
                let currentThing = data.list[i];
                // currentCard =
                console.log(currentThing);
                icon = currentThing.weather[0].icon;
                $("#wicon-"+i).attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png` )
                //for each of the cards, set the text in div with class=date-i to equal the string value of dt_txt (using substring to get rid of time stamp at end)
                $(".date-"+i).text('Date: '+ currentThing.dt_txt.substring(5,10));
                $(".temp-"+i).text('Temp: '+ currentThing.main.temp +'\u2109');
                $(".humidity-"+i).text('Humidity: '+ currentThing.main.humidity +'%');
                $(".wind-"+i).text('Windspeed: '+ currentThing.wind.speed +'mph');

                console.log(currentThing.weather[0].icon);

                i  = i + 8; //looping by 8 since 3hr timeblock * 8 gets to next day

            }
         //get temp, wind, humidity from data and put in card

            
        }); //ends my then-statement (once data is there)
        forecastURL = ''; 
        
}

$(saver).on('click', saver, function(event) {
    event.preventDefault();
    event.stopPropagation();
    city = $(searcher).val(); //whatever the user typed in is my city
    let newCity = document.createElement("li"); //make a list item to put in the search history box
    $(newCity).text(city); //need to actually set the city into the list item
    document.getElementById("selectable").appendChild(newCity); //add <li> to <ul>
    localStorage.setItem(city, city); //save the searched city in localstorage using the city name as both the key and the value. making the key the city name will prevent the city from taking up several spots in local storage (and in little search history box) if the user gets data for that city several times.
    getCoords(city); //take the user input and get lat & lon with getcoords function
    $(searcher).val(''); //courtesy reset of search text area so user doesn't have to erase/backspace to type in a new city
});
 

//grab all of the searched cities from localstorage and repopulate the list below the search bar with clickable list items that recall the getcoords function with the correct city name when clicked
$(document).ready(function() {
    for (i = 0; i < localStorage.length; i++) { //check what in localStorage and loop through everything
        let newCity = document.createElement("li"); //for each item we'll create our list item
        myKey = localStorage.key(i) //get the key (should be city name)
        let myCity = localStorage.getItem(myKey); //get the value (also city name)
        $(newCity).text(myCity); // put city name into the <li> just created
        document.getElementById("selectable").appendChild(newCity); //gotta add the <li> to our list 
        $(newCity).addClass('list-hov');
        $(newCity).on('click', function() { //when our li (city name) is clicked -->
            getCoords($(newCity).text()); //we run getCoords using the text (aka city name) as our param
        }); 
    };    

})
