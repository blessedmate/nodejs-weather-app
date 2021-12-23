const { readInput } = require("./helpers/inquirer");

const main = async () => {
  const text = await readInput("Morning:");
  console.log(text);
};

main();
