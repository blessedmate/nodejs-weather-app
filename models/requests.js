const axios = require("axios").default;
const fs = require("fs");
const capitalize = require("capitalize");

class Requests {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    // TODO: Read DB
    this.readDB();
  }

  get historyCapitalized() {
    return this.history.map((place) => {
      return capitalize.words(place);
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "en",
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
    };
  }

  async findCity(place = "") {
    try {
      // http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async getWeatherInfo(lat, lon) {
    try {
      // http request
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const response = await instance.get();
      const { weather, main } = response.data;
      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log("error");
    }
  }

  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase());

    // Save in json
    this.saveDB();
  }

  saveDB() {
    const data = {
      history: this.history,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(data));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const dbInfo = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(dbInfo);
    this.history = data.history;
  }
}

module.exports = Requests;
