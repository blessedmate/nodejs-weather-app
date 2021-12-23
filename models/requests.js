const axios = require("axios").default;

class Requests {
  history = ["Bucaramanga", "New York", "Mannheim"];

  constructor() {
    // TODO: Read DB
  }

  async city(place = "") {
    // http
    try {
      const resp = await axios.get("https://reqres.in/api/users?page=2");
      console.log(resp.data.per_page);

      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Requests;
