import { is } from '../src';

describe('ludd utils', () => {
  it('toString', () => {
    expect(is([1, 2, 3], 'Array')).toBe(true);
  });
});
