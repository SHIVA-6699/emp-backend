/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import config from "./app/config";
import colors from "colors";
import { sequelizeConnection } from "./app/utils/sequelizeConnection";
let server: Server;

async function main() {
  try {
    await sequelizeConnection.sync({
      alter: config.NODE_ENV === "production",
    });
    server = app.listen(config.port, () => {
      console.log(colors.green.bold(`App listening on port ${config.port} ✔️`));
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on("unhandledRejection", error => {
  console.log(
    colors.red.bold("😈 unhandledRejection is detected, shutting down..."),
    console.log(error)
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// handle uncaughtException
process.on("uncaughtExceptionMonitor", () => {
  console.log(
    colors.red.bold("😈 unhandledRejection is detected, shutting down...")
  );
});
