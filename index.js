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
        const selected = possiblePlaces.find((l) => l.id === id);

        // get weather data

        // show results
        console.log("\nPlace info \n".green);
        console.log("City:", selected.name);
        console.log("Lat:", selected.lat);
        console.log("Lng:", selected.lng);
        console.log("Temperature:");
        console.log("Min:");
        console.log("Max:");
        console.log("Weather description:");

        break;
      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
