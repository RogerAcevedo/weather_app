import React, { useState} from "react";

// MAKE API CALL
const api = {
  key: "1ab3f7df692f14d3520e2451e87f14af",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // ? CREATE SEARCH FUNCTION
const search = evt => {
  if (evt.key === "Enter") {
    // ? WHEN THEY CLICK ENTER SENDS FETCH REQUEST TO API
      // ?
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      // ? ONCE ITS SUMBITTED IT WILL BE BACK AN AM EMPTY STRING
      setQuery('');
      // console.log(result);
    });
  }  
}  


  // ? CREATE A CALENDAR - has all months(0-11 idx) and days(0-6 idx) 
const dateBuilder = (d) => {

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // ? GETS US CURRENT DAY
  let day = days[d.getDay()];
  // ? GETS US OUR DATE (DAY NUMBER)
  let date = d.getDate();
  // ? GETS US OUR MONTHS
  let month = months[d.getMonth()];
  // ? GETS OUR FULL YEAR
  let year = d.getFullYear();

  return `${day}, ${month} ${date}, ${year}`
}




  return (
    <div className={
      // ? IF WE HAVENT SEARCH "undefined" it is set to 'app'
      (typeof weather.main != "undefined")
      // ? if we searched and is not equals to "undefined" and check if its 70
        ? ((weather.main.temp >65)
        // ? IF IT IS OVER 70, WE CHANGE TO WARM
          ? 'app warm'
          // ? ELSE KEEP IT AS APP
          : 'app')
        : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar"
          placeholder="Search..."
          // ? e.target.value. gets input of what is being typed
          onChange={e => setQuery(e.target.value)}
          // ? UPDATED QUERY WILL BE AM EMPTY STRING AFTER SEARCH
          value={query}
          // ?
          onKeyPress={search}
          />
        </div>
        {( typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name} , {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {/* Math.round rounds the weather to a whole number */}
              {Math.round(weather.main.temp)} F°
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
