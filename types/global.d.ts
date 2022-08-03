import { CSSProperties } from 'react';

declare global {
   interface Styling extends CSSProperties {
      [key: string]: any;
   }

   type Fn = (...args) => any;
}
