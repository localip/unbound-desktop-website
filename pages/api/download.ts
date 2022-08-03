import type { NextApiRequest, NextApiResponse } from 'next';
import { database, useDatabase } from '@db';
import { NC_OPTIONS } from '@constants';
import { Collection } from 'mongodb';
import nc from 'next-connect';

const handler = nc(NC_OPTIONS);
handler.use(useDatabase);

handler.get(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
   res.redirect('https://codeload.github.com/powercord-org/powercord/zip/refs/heads/v2');
});

export default handler;