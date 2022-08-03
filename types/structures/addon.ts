import Developer from './developer';

export default interface Addon {
   name: string,
   previews?: string[],
   description: string;
   id: string;
   url: string;
   likes: number;
   downloads: number;
   author: Developer | undefined;
   type: string;
};