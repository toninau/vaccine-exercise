import * as fs from 'fs/promises';
import path from 'path';

const parseFiles = async <T>(directory: string): Promise<T[]> => {
  const fileNames = await fs.readdir(directory);
  const array = await Promise.all(fileNames.map(async (name) => {
    const fileString = await fs.readFile(path.join(directory, name), 'utf8');
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

export default parseFiles;