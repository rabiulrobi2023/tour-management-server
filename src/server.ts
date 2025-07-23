/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import "dotenv/config";
import app from "./app";
import { envVariable } from "./app/config/envConfig";
import seedSuperAdmin from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${envVariable.DB_URL}`);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB with Mongoose!"
    );

    server = app.listen(envVariable.PORT, () => {
      console.log(
        `Tour Management Server is Running on Port: ${envVariable.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

//=============Unhandle Rejection Error Handling================
process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandle rejection detected.");
  console.log("Server is shutting down...");
  console.log(err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//=============Uncaught Error Handling================
process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught exception detected.");
  console.log("Server is shutting down...");
  console.log(err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//=============SIGTERM Signal Handling================
process.on("SIGTERM", () => {
  console.log("❌ SIGTERM signal reveived");
  console.log("Server is shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//=============SIGINT Signal Handling================
process.on("SIGINT", () => {
  console.log("❌ SIGINT signal reveived");
  console.log("Server is shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
