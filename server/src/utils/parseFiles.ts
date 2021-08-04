import { Order, Vaccination } from '../types';
import * as fs from 'fs/promises';

const main = async (orders: string[], vaccinations: string[]): Promise<[Order[], Vaccination[]]> => {
  const orderArrays = await parseFiles<Order>('orders', orders);
  const vaccinationArrays = await parseFiles<Vaccination>('vaccinations', vaccinations);
  return [orderArrays, vaccinationArrays];
};

const parseFiles = async <T>(path: string, fileNames: string[]): Promise<T[]> => {
  const array = await Promise.all(fileNames.map(async (name) => {
    const fileString = await fs.readFile(`./resources/${path}/${name}`, 'utf8');
    const data = parseString<T>(fileString);
    return data;
  }));
  return array.flat(1);
};

const parseString = <T>(fileString: string): T[] => {
  const fileLines = fileString.trim().split('\n');
  const arrayOfObjects = fileLines.map((string) => {
    const object = JSON.parse(string) as T;
    return object;
  });
  return arrayOfObjects;
};

export default main;