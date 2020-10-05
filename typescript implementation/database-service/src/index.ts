import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const express = require("express");
const bodyParser = require("body-parser");
import { Mongodb } from "./database/mongodb";
import { generateRoute } from "./api/generateRoutes";
import { routes } from "./api/routes";

const app = express();
app.use(bodyParser.json());

routes.forEach((route) => {
  generateRoute(app, route);
});

app.listen(process.env.PORT, async () => {
  try {
    await Mongodb.connect();
    console.log("Datenbank gestartet");
  } catch (err) {
    console.log(err);
  }
  console.log("Server startet");
});
