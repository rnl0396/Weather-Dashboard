var cityName=document.getElementById("searchBar").value;

var cityList = document.querySelector("#listGroup");

var cityNames = [];

// The following function renders items in a city list as <li> elements
function renderCities() {
    // Clear cityList element
    cityList.innerHTML = "";
    
    // Render a new li for each city
    for (var i = 0; i < cityNames.length; i++) {
        var cityName = cityNames[i];
    
        var btn = document.createElement("BUTTON");
        btn.innerText = cityName;
        btn.setAttribute("data-index", i);
    
        cityList.appendChild(btn);
    }
}

// This function is being called below and will run when the page loads.
function init() {
// Get stored cities from localStorage
var storedCities = JSON.parse(localStorage.getItem("cityName"));

// If cities were retrieved from localStorage
if (storedCities !== null) {
    cityNames = storedCities;
}

// This is a helper function that will render cities to the DOM
renderCities();
}

function storeCities() {
// Stringify and set key in localStorage to cities array
localStorage.setItem("cityNames", JSON.stringify(cityNames));
}



document.getElementById("submitB").addEventListener("click",function(event){
    event.preventDefault();
    var cityName=document.getElementById("searchBar").value;
    document.getElementById("image1").innerHTML="";
    document.getElementById("image2").innerHTML="";
    document.getElementById("image3").innerHTML="";
    document.getElementById("image4").innerHTML="";
    document.getElementById("image5").innerHTML="";
    
    // var cityText = cityName.value.trim();

    if (!cityName) {
        // Using a model if city is invalid
        document.getElementById("alertMessage").style.display="";
        document.getElementById("cityName").innerText="Unknown city name";
        document.getElementById("column2").style.display="";


    } else {
        document.getElementById("column2").style.display="";
        // document.getElementById("image1").clear();
        document.getElementById("cityName").innerText=cityName;
        document.getElementById("searchHistory").style.display="";

        cityNames.push(cityName);
        

        init();
        storeCities();

        document.getElementById("listGroup").innerText=cityName;


        var requestUrl="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=eae885603ff663eaa33d893bb51bceb8";

        var requestUrl2= "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&units=imperial&limit=1&appid=eae885603ff663eaa33d893bb51bceb8";


        fetch(requestUrl).then(function(response){
            if(!response.ok) {
                
                document.getElementById("alertMessage").style.display="";
                document.getElementById("cityName").innerText="Unknown city name";
            } else {
                document.getElementById("alertMessage").style.display="none";
                return response.json();
            }
            
        
        }).then(function(data){
            console.log(data);
            

            // 
            document.getElementById("currentTemp").innerText="Temperature: "+data.main.temp+" ℉";
            document.getElementById("currentHumid").innerText="Humidity: "+data.main.humidity+"%";
            document.getElementById("currentWind").innerText="Wind-Speed: "+data.wind.speed+" MPH";


            fetch(requestUrl2).then(function(response){
                if(!response.ok) {
                    
                    alert("No information found for "+cityName);
                }
                return response.json();
    
            }).then(function(data){
                console.log(data);
    
                var latitude=data[0].lat;
                var longitude=data[0].lon;

                
    
                var forecastRequestUrl="http://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid=eae885603ff663eaa33d893bb51bceb8"
    
                fetch(forecastRequestUrl).then(function(response) {
                    if(!response.ok) {
                        alert("No forecast found for "+cityName);

                        document.getElementById("day1").innerText="";
                        document.getElementById("day2").innerText="";
                        document.getElementById("day3").innerText="";
                        document.getElementById("day4").innerText="";
                        document.getElementById("day5").innerText="";
        
                        //getting the temp
                        document.getElementById("temp1").innerText="";
                        document.getElementById("temp2").innerText="";
                        document.getElementById("temp3").innerText="";
                        document.getElementById("temp4").innerText="";
                        document.getElementById("temp5").innerText="";
        
                        // getting the humidity
                        document.getElementById("humid1").innerText="";
                        document.getElementById("humid2").innerText="";
                        document.getElementById("humid3").innerText="";
                        document.getElementById("humid4").innerText="";
                        document.getElementById("humid5").innerText="";

                    }
                    return response.json();
                }).then(function(data){
                    console.log(data);

                    // getting the image of clouds
                    var img1 = document.createElement("img");
                    img1.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
                    var src = document.getElementById("image1");
                    src.appendChild(img1);

                    var img2 = document.createElement("img");
                    img2.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
                    var src = document.getElementById("image2");
                    src.appendChild(img2);

                    var img3 = document.createElement("img");
                    img3.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png";
                    var src = document.getElementById("image3");
                    src.appendChild(img3);

                    var img4 = document.createElement("img");
                    img4.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png";
                    var src = document.getElementById("image4");
                    src.appendChild(img4);

                    var img5 = document.createElement("img");
                    img5.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png";
                    var src = document.getElementById("image5");
                    src.appendChild(img5);

                    var img6 = document.createElement("img");
                    img6.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
                    var src = document.getElementById("cityName");
                    src.appendChild(img6);


    
                    // getting the date
                    document.getElementById("day1").innerText=moment().format('L');
                    document.getElementById("day2").innerText=moment().add(1, 'days').format('L');
                    document.getElementById("day3").innerText=moment().add(2, 'days').format('L');
                    document.getElementById("day4").innerText=moment().add(3, 'days').format('L');
                    document.getElementById("day5").innerText=moment().add(4, 'days').format('L');
    
                    //getting the temp
                    document.getElementById("temp1").innerText="Temperature: "+data.daily[0].temp.day+" ℉";
                    document.getElementById("temp2").innerText="Temperature: "+data.daily[1].temp.day+" ℉";
                    document.getElementById("temp3").innerText="Temperature: "+data.daily[2].temp.day+" ℉";
                    document.getElementById("temp4").innerText="Temperature: "+data.daily[3].temp.day+" ℉";
                    document.getElementById("temp5").innerText="Temperature: "+data.daily[4].temp.day+" ℉";
    
                    // getting the humidity
                    document.getElementById("humid1").innerText="Humidity: "+data.daily[0].humidity+"%";
                    document.getElementById("humid2").innerText="Humidity: "+data.daily[1].humidity+"%";
                    document.getElementById("humid3").innerText="Humidity: "+data.daily[2].humidity+"%";
                    document.getElementById("humid4").innerText="Humidity: "+data.daily[3].humidity+"%";
                    document.getElementById("humid5").innerText="Humidity: "+data.daily[4].humidity+"%";

                    // getting UV Index on current day
                    document.getElementById("currentUV").innerText="UV-Index: "+data.daily[0].uvi;

                    var currentUVI = data.daily[0].uvi;

                    if (currentUVI <=2.0) {
                        document.getElementById("currentUV").style.backgroundColor = "green";
                    } else if (currentUVI <=5.0) {
                        document.getElementById("currentUV").style.backgroundColor = "yellow";
                    } else {
                        document.getElementById("currentUV").style.backgroundColor = "red";
                    }
    
                });


            });


        });
    }
});

