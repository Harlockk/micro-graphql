const fs = require('fs');
const listFiles = require('../listFiles');

jest.mock('fs');

describe('listFiles function', () => {
  const args = '/foo/bar';

  it('Should return a promise', () => {
    expect(listFiles(...args)).toBeInstanceOf(Promise);
  });

  describe('returned Promise', () => {
    it('Should resolve the files in the folder', async () => {
      const files = await listFiles(...args);

      expect(files).toEqual(['index.js', 'foo.js', 'bar.js']);
    });

    it('Should resolve to an error if error occured', async () => {
      const errorOccured = new Error('An error occured');
      fs.__setError(errorOccured); // eslint-disable-line

      expect(listFiles()).rejects.toEqual(errorOccured);
    });
  });
});
