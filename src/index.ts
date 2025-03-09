import { AppDataSource } from "./data-source";
import * as express from "express";
import * as path from "path";
// var bodyParser = require('body-parser');
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors";
// import formData from "express-form-data"
const formData = require("express-form-data");
import { ControlllerResponseInterface } from "./api/controller_response";
import { connected } from "process";

require("dotenv").config();
const app = express();
const port = process.env.PORT_DEV;
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync("./src/key.pem", "utf8");
const certificate = fs.readFileSync("./src/cert.pem", "utf8");
const options = {
  key: privateKey,
  cert: certificate,
};
const httpsServer = https.createServer(options, app);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.static('/home/agung/pany-api'));
    app.use("*/images", express.static(__dirname + "/../images"));
    app.use("*/resources", express.static(__dirname + "/../resources"));

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
    httpsServer.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
