const axios = require("axios").default;

class Requests {
  history = ["Bucaramanga", "New York", "Mannheim"];

  constructor() {
    // TODO: Read DB
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
}

module.exports = Requests;
