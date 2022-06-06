import type { NextApiRequest, NextApiResponse } from 'next';
import { database, useDatabase } from '@db';
import { NC_OPTIONS } from '@constants';
import { Collection } from 'mongodb';
import nc from 'next-connect';

const handler = nc(NC_OPTIONS);
handler.use(useDatabase);

handler.get(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
   const { id } = req.query;

   const addons: Collection | void = database.db?.collection('addons');
   if (addons) {
      const data = await addons.findOne({ type: 'plugins', id });
      const users = database.db?.collection('users');

      if (data && users) {
         const author = await users.findOne({ _id: data.author, developer: true });
         data.author = author;

         res.status(200).json(data);
      }
   }

   res.status(404).end();
});

export default handler;