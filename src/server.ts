import "reflect-metadata";
import app from './app';
import { AppDataSource } from "./config/database";

AppDataSource.initialize().then(async () => {
  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
})
  .catch(console.error)