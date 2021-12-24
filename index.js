require("dotenv").config();
const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
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
        requests.city(place);

        // search places

        // select a place

        // get weather data

        // show results
        console.log("\nPlace info \n".green);
        console.log("City:");
        console.log("Lat:");
        console.log("Lng:");
        console.log("Temperature:");
        console.log("Min:");
        console.log("Max:");

        break;
      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
