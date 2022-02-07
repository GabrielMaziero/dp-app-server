import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: MongoClient,
  uri: String,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient
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
    console.log('database disconnect')
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return (await MongoClient.connect(this.uri)).db().collection(name)
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
};