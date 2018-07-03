(function()
  {
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '804b8418dffde9537072337980079949';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyC-7R8GehaI6wfdi-39HVVQGF3OucZCXEk';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  var location; 
  // This function returns a promise that will resolve with an object of lat/lng coordinates
  function getCoordinatesForCity(cityName) {
    // This is an ES6 template string, much better than verbose string concatenation...
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    
$(".icon").addClass("hidden");
$(".loader").removeClass("hidden");
$(".city-weather").addClass("hidden");
$("#city-weather1").addClass("hidden");
$("#city-weather2").addClass("hidden");
$("#city-weather3").addClass("hidden");
$("#city-weather4").addClass("hidden");
$("#city-weather5").addClass("hidden");
    return (
      fetch(url) // Returns a promise for a Response
      .then(response => response.json()) // Returns a promise for the parsed JSON
      .then(function(data) {
        location = data;
        return data.results[0].geometry.location
      
      })
         // Transform the response to only take what we need
      
    );
    

  }
  

  function getCurrentWeather(coords) {
    // Template string again! I hope you can see how nicer this is :)
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=us&exclude=minutely,hourly,alerts,flags`;
    return (
      fetch(url)
      .then(response => response.json())
      .then(function(data) {
      
      return data;
    })
    );
  }
 

  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var autocomplete = new google.maps.places.Autocomplete(cityInput);
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');
  var cityWeather1 = app.querySelector('#city-weather1');
  var cityWeather2 = app.querySelector('#city-weather2');
  var cityWeather3 = app.querySelector('#city-weather3');
  var cityWeather4 = app.querySelector('#city-weather4');
  var cityWeather5 = app.querySelector('#city-weather5');

  cityForm.addEventListener('submit', function(event) { // this line changes
    event.preventDefault(); // prevent the form from submitting
    

    // This code doesn't change!
    var city = cityInput.value;
    var condition = ["clear-day", "clear-night", "partly-cloudy-day",
    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
    "fog"]; 

    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather) {
      $(".loader").addClass("hidden");
      $(".city-weather").removeClass("hidden");
      $("#city-weather1").removeClass("hidden");
      $("#city-weather2").removeClass("hidden");
      $("#city-weather3").removeClass("hidden");
      $("#city-weather4").removeClass("hidden");
      $("#city-weather5").removeClass("hidden");
      cityWeather.innerText = "Location: " + location.results[0].formatted_address+ "\n" +
      "Current Weather: " + weather.currently.icon + "\n" + 'Current temperature: ' + weather.currently.temperature + '°F'+ 
      "\n" + 'Wind Speed: ' + weather.currently.windSpeed + " MPH" + "\n" + 'Humidity: ' + 
      weather.currently.humidity + "%" + 
      "\n" + 'Precipitation probability: ' + weather.currently.precipProbability + " %";
     
      for(i = 0; i< 10; i++){
        var h = i + 1;
      if (weather.currently.icon == condition[i]){
        $("form #icon"+h).removeClass("hidden");
      }
    }

  for(j=1; j<6; j++)
     { for(i = 0; i< 10; i++)
      {
        var h = i + 1;
        if (weather.daily.data[j].icon == condition[i]){
          $("#icon"+j+h).removeClass("hidden");
         

      }
      
    }
    }
    
   

      // Unixtimestamp
      var unixtimestamp = [weather.daily.data[1].time,weather.daily.data[2].time,
      weather.daily.data[3].time,weather.daily.data[4].time,weather.daily.data[5].time];
     
      // Months array
      var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var convdataTime =[];
      // Convert timestamp to milliseconds
      for(i = 0; i <5; i++){
      var date = new Date(unixtimestamp[i]*1000);
     
      // Year
      var year = date.getFullYear();
     
      // Month
      var month = months_arr[date.getMonth()];
     
      // Day
      var day = date.getDate();
  
      convdataTime[i] = month+'/'+day+'/'+year;
      }
      cityWeather1.innerText = convdataTime[0] + "\n" + weather.daily.data[1].icon+ "\n" + "High:" + weather.daily.data[1].temperatureHigh +'°F'+"\n" 
      + "Low:" + weather.daily.data[1].temperatureLow+ '°F';
      cityWeather2.innerText = convdataTime[1] + "\n" + weather.daily.data[2].icon+ "\n" + "High:" + weather.daily.data[2].temperatureHigh +'°F'+"\n" 
      + "Low:" + weather.daily.data[1].temperatureLow+ '°F';
      cityWeather3.innerText = convdataTime[2] + "\n" + weather.daily.data[3].icon+ "\n" + "High:" + weather.daily.data[3].temperatureHigh +'°F'+"\n" 
      + "Low:" + weather.daily.data[1].temperatureLow+ '°F';
      cityWeather4.innerText = convdataTime[3] + "\n" + weather.daily.data[4].icon+ "\n" + "High:" + weather.daily.data[4].temperatureHigh +'°F'+"\n" 
      + "Low:" + weather.daily.data[1].temperatureLow+ '°F';
      cityWeather5.innerText = convdataTime[4] + "\n" + weather.daily.data[5].icon+ "\n" + "High:" + weather.daily.data[5].temperatureHigh +'°F'+"\n" 
      + "Low:" + weather.daily.data[1].temperatureLow+ '°F';
  }
    
   
  
    )



  });



})();





