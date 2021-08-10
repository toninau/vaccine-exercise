import parseQueryDate from '../utils/parseQueryDate';

describe('parses date string from query', () => {
  test('when input contains only date', () => {
    const values1 = parseQueryDate('2012-02-20');
    expect(values1).toEqual([2012, 2, 20, 0, 0, 0]);
  });
  test('when input contains date and time', () => {
    const values2 = parseQueryDate('2021-12-01T11:10:06');
    expect(values2).toEqual([2021, 12, 1, 11, 10, 6]);
  });
});

describe('throws date missing error when parsing', () => {
  test('empty field', () => {
    expect(() => parseQueryDate('')).toThrow('date missing');
  });
  test('missing field', () => {
    expect(() => parseQueryDate(undefined)).toThrow('date missing');
  });
});

describe('throws date invalid error when parsing', () => {
  test('a value that is not a date', () => {
    expect(() => parseQueryDate('string')).toThrow('date invalid');
  });
  test('a value that is not in the correct format (ISO 8601)', () => {
    expect(() => parseQueryDate('2012-2-2')).toThrow('date invalid');
  });
  test('a value that contains non-existent date', () => {
    expect(() => parseQueryDate('2021-02-30')).toThrow('date invalid');
  });
});