import { DataSource } from "typeorm";
import { Account } from "../entities/Account";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "lwrbsdGcM0802",
  database: "dp-app-server",
  synchronize: true,
  logging: true,
  entities: [Account],
  subscribers: [],
  migrations: [],
})