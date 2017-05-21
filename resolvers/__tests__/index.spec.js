const resolverIndex = require('../index');

jest.mock('../../utils/listFiles', () => () => ['__tests__', 'index.js', 'foo.mock.js', 'bar.mock.js']);

describe('resolver index', () => {
  it('Should return an object', async () => {
    const result = await resolverIndex();

    expect(result).toBeInstanceOf(Object);
  });

  it('Should return an object containing resolvers present in the folder', async () => {
    const result = await resolverIndex();
    const resolverFooValue = await result['foo.mock']();
    const resolverBarValue = await result['bar.mock']();

    expect(resolverFooValue).toEqual({ name: 'foo' });
    expect(resolverBarValue).toEqual({ name: 'bar' });
  });

  it('Should return an object not containing index or tests', async () => {
    const result = await resolverIndex();

    expect(result.index).toBeUndefined();
    expect(result.__tests__).toBeUndefined(); // eslint-disable-line
  });

  it('Should have a resolver for each resolvers present in the folder', async () => {
    const result = await resolverIndex();

    expect(Object.keys(result).length).toEqual(2);
  });
});
