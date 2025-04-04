import { AppDataSource } from "./data-source";
import * as express from "express";
import * as path from "path";
// var bodyParser = require('body-parser');
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors";
// import formData from "express-form-data"
const formData = require("express-form-data");
import { ControlllerResponseInterface } from "./helper/controller_response";
import { connected } from "process";

require("dotenv").config();
const app = express();
const port = process.env.PORT_DEV;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use(
      cors({
        origin: ["http://localhost:3000", "https://www.theunifiedgolf.com"],
        methods: ["GET", "POST", "PUT", "DELETE"], // Metode HTTP yang diizinkan
      })
    );
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use("*/images", express.static(__dirname + "/../images"));
    // app.use("*/resources", express.static(__dirname + "/../resources"));

    // register routes
    // app.use(getURL);
    app.get("/site", async (req, res) => {
      res
        .status(200)
        .send('<script> alert("Network service allowed"); close();</script>');
      console.log("Site is runnning");
    });
    app.use("/", routes);
    // start express server
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
