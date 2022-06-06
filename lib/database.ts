import { DB_COLLECTIONS } from '@constants';
import { Db, MongoClient } from 'mongodb';

interface Database {
   client: MongoClient | null,
   db: Db | null;
   connected?: boolean;
}

interface DatabaseData {
   uri: string | void,
   name: string | void;
}

const data: DatabaseData = {
   uri: process.env.MONGODB_URI,
   name: process.env.MONGODB_DB
};

export const database: Database = {
   client: null,
   db: null,
   connected: false
};

if (!data.uri) {
   throw new Error('MONGODB_URI is missing from the the process environment.');
}

if (!data.name) {
   throw new Error('MONGODB_DB is missing from the the process environment.');
}

export async function getDatabase(): Promise<Database> {
   if (database.client && database.db) {
      return {
         client: database.client,
         db: database.db
      };
   }

   const client = await MongoClient.connect(data.uri as string);
   const db = await client.db(data.name as string);

   database.client = client;
   database.db = db;

   // Create any missing collections
   for (const collection of DB_COLLECTIONS) {
      if (db.collection(collection)) continue;
      await db.createCollection(collection);
   }

   return { client, db };
}

export async function useDatabase(_: any, __: any, next: () => void) {
   await getDatabase();
   next();
}