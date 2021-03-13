// index.js
const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache'
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/
let DATA = {
  name: 'Eric Karpovits',
  refresh_date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'America/Toronto', 
  }),
};

async function setWeatherInformation() {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=6094817&appid=717c2039b39065dd8b789cd934b0cd99&units=metric`
    )
      .then(r => r.json())
      .then(r => {
        DATA.city_temperature = Math.round(r.main.temp);
        DATA.city_weather = r.weather[0].description;
        DATA.city_weather_icon = r.weather[0].icon;
        DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Toronto',
        });
        DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Toronto',
        });
      });
}

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
    /**
     * Fetch Weather
     */
    await setWeatherInformation();
  
    /**
     * Get pictures
     * await setInstagramPosts();
     */
    
  
    /**
     * Generate README
     */
    await generateReadMe();
  
    /**
     * Fermeture de la boutique 👋
     * await puppeteerService.close();
     */
    
  }
  
action();
