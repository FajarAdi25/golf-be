import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customers } from "./entity/customers";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST_DEV,
  port: Number(process.env.DB_PORT_DEV),
  username: process.env.DB_USERNAME_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME_DEV,
  timezone: "+00:00", // for writing to database
  synchronize: false,
  logging: false,
  entities: [Customers],
  migrations: [],
  subscribers: [],
});
