require("dotenv").config();
const {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} = require("./helpers/inquirer");
const Requests = require("./models/requests");
require("colors");

const main = async () => {
  let opt = "";
  let requests = new Requests();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // show message
        const place = await readInput("City: ");

        // search places
        const possiblePlaces = await requests.findCity(place);

        // select a place
        const id = await listPlaces(possiblePlaces);
        if (id === 0) {
          continue;
        }
        const selected = possiblePlaces.find((l) => l.id === id);

        // save in json
        requests.addHistory(selected.name);

        // get weather data
        const weatherInfo = await requests.getWeatherInfo(
          selected.lat,
          selected.lng
        );

        // show results
        console.clear();
        console.log("\nPlace info \n".green);
        console.log("City:", selected.name.yellow);
        console.log("Lat:", selected.lat);
        console.log("Lng:", selected.lng);
        console.log("Temperature:", weatherInfo.temp);
        console.log("Min:", weatherInfo.min);
        console.log("Max:", weatherInfo.max);
        console.log("Weather description:", weatherInfo.description.yellow);

        break;
      case 2:
        requests.historyCapitalized.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
