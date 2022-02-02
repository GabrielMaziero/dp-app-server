import mongoose, { Mongoose } from "mongoose";

export const MongoHelper = {
  client: null as Mongoose,
  uri: null as string,
  async connect(uri: string): Promise<void> {
    this.client = mongoose
      .connect(uri)
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null
  }
};