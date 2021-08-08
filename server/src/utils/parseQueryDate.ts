import { DateTime } from 'luxon';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const toDateTime = (date: string) => {
  return DateTime.fromFormat(date, 'yyyy-MM-dd');
};

const parseQueryDate = (date: unknown) => {
  if (!date || !isString(date)) {
    return null;
  }
  const dateTime = toDateTime(date);
  if (!dateTime.isValid) {
    return null;
  }
  return [dateTime.year, dateTime.month, dateTime.day];
};

export default parseQueryDate;