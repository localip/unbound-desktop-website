import type { NextApiRequest, NextApiResponse } from 'next';
import { database, useDatabase } from '@db';
import { NC_OPTIONS } from '@constants';
import { Collection } from 'mongodb';
import nc from 'next-connect';

const handler = nc(NC_OPTIONS);
handler.use(useDatabase);

handler.get(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
   const collection: Collection | void = database.db?.collection('users');
   if (collection) {
      const data = await collection.find({ developer: true }).toArray();

      if (data) res.status(200).json({
         count: data.length,
         data
      });
   }

   res.status(404).end();
});

export default handler;