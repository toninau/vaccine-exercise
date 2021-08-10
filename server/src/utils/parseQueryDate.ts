import { DateTime } from 'luxon';
import boom from '@hapi/boom';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const toDateTime = (date: string) => {
  return DateTime.fromISO(date);
};

const parseQueryDate = (date: unknown) => {
  if (!date || !isString(date)) {
    throw boom.badRequest('date missing');
  }
  const dateTime = toDateTime(date);
  if (!dateTime.isValid) {
    throw boom.badRequest('date invalid');
  }
  return [
    dateTime.year,
    dateTime.month,
    dateTime.day,
    dateTime.hour,
    dateTime.minute,
    dateTime.second
  ];
};

export default parseQueryDate;