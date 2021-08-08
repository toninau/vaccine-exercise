import parseQueryDate from '../utils/parseQueryDate';

describe('parses date string from query', () => {
  test('when input is correct', () => {
    const values1 = parseQueryDate('2012-02-20');
    expect(values1).toEqual([2012, 2, 20]);
    const values2 = parseQueryDate('2021-12-01');
    expect(values2).toEqual([2021, 12, 1]);
  });
  test('when value is empty', () => {
    const values = parseQueryDate('');
    expect(values).toBeNull();
  });
  test('when field is missing', () => {
    const values = parseQueryDate(undefined);
    expect(values).toBeNull();
  });
  test('when value is not a date', () => {
    const values = parseQueryDate('string');
    expect(values).toBeNull();
  });
  test('when value is not in correct format (no padding)', () => {
    const values = parseQueryDate('2012-2-2');
    expect(values).toBeNull();
  });
  test('when value is not in correct format (yyyy-MM-dd)', () => {
    const values = parseQueryDate('2012-29-02');
    expect(values).toBeNull();
  });
  test('when value contains non-existent date', () => {
    const values = parseQueryDate('2021-02-30');
    expect(values).toBeNull();
  });
});