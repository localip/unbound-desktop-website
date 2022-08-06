import type { NextApiResponse } from 'next';

export const DISCORD = 'awnvkjJH5p';

export const DB_COLLECTIONS = [
   'addons',
   'developers',
   'applications'
];

export const NC_OPTIONS = {
   onError(err: any, _: any, res: NextApiResponse) {
      res.statusCode = err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
      res.json({ message: err.message });
   },
};

export const PARSER_VALUES = [
   {
      value: 1,
      symbol: ' '
   },
   {
      value: 1e4,
      symbol: 'K'
   },
   {
      value: 1e6,
      symbol: 'M'
   },
   {
      value: 1e9,
      symbol: 'G'
   },
   {
      value: 1e12,
      symbol: 'T'
   },
   {
      value: 1e15,
      symbol: 'P'
   },
   {
      value: 1e18,
      symbol: 'E'
   }
];