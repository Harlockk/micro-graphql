const readFile = require('../readFile');
const fs = require('fs');

jest.mock('fs');

describe('listFiles function', () => {
  const args = '/foo/bar.txt';

  it('Should return a promise', () => {
    expect(readFile(...args)).toBeInstanceOf(Promise);
  });

  describe('returned Promise', () => {
    it('Should resolve the content of the file', async () => {
      const files = await readFile(...args);

      expect(files).toEqual('Lorem ipsum');
    });

    it('Should resolve to an error if error occured', async () => {
      const errorOccured = new Error('An error occured');
      fs.__setError(errorOccured); // eslint-disable-line

      expect(readFile()).rejects.toEqual(errorOccured);
    });
  });
});
