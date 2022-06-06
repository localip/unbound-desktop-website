import { PARSER_VALUES } from '@constants';

export function formatUnit(number: number, digits: number = 1) {
   const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
   const item = PARSER_VALUES.slice().reverse().find(item => number >= item.value);

   return item ? (number / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}