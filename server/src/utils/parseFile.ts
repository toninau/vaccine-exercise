import { Order } from '../models/order';
import * as fs from 'fs/promises';

const parseFiles = async () => {
  const brands = ['Antiqua', 'SolarBuddhica', 'Zerpfy'];

  const brandArrays = await Promise.all(brands.map(async (brand) => {
    const fileString = await fs.readFile(`./resources/${brand}.source`, 'utf8');
    const data = parseString(fileString);
    return data;
  }));
  return brandArrays.flat(1);
};

const parseString = (fileString: string): Order[] => {
  const fileLines = fileString.trim().split('\n');

  const orderArray = fileLines.map((string) => {
    const test = JSON.parse(string) as Order;
    return test;
  });

  return orderArray;
};

export default parseFiles;
