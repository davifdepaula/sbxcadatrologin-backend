import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
const mongoClient = new MongoClient(DATABASE_URL)
let db;

try {
  await mongoClient.connect()
  db = mongoClient.db()
  console.log("conectado ao banco de dados") 
} catch (error) {
  console.log('Deu errro no server')
}

export default db