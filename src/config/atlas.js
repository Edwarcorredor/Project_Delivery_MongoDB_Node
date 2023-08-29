import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
dotenv.config("../");
export async function conexion() {
  try {
    const user = ""
    const password = ""
    const dbName = ""
    const cluster = ""
    const uri = `mongodb+srv://${user}:${password}@${cluster}.kyfguog.mongodb.net/${dbName}`;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(uri, options);
    return client.db();
  } catch (error) {
    return {status: 500, message: error};
  }
}

