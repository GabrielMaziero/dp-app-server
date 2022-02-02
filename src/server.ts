import app from './app';
import { MongoHelper } from './config/database';
import 'dotenv/config'

MongoHelper.connect(process.env.MONGO_URL).then(async () => {
  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
})
  .catch(console.error)