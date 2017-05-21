const schemaIndex = require('../index');
const { buildSchema, GraphQLSchema } = require('graphql');

const mockedFooGraphQL = `
type Query {
  bar: Bar 
}`;
const mockedBarGraphQL = `
type Bar {
  name: String 
}`;
const mockedInvalidFileGraphQL = `
type Invalid {
  name: String 
}`;

jest.mock('../../utils/listFiles.js', () => () => ['__tests__', 'index.js', 'foo.graphql', 'bar.graphql']);
jest.mock('../../utils/readFile.js', () => (fileName) => {
  let returnedValue = mockedInvalidFileGraphQL;
  if (fileName.indexOf('foo.graphql') >= 0) {
    returnedValue = mockedFooGraphQL;
  } else if (fileName.indexOf('bar.graphql') >= 0) {
    returnedValue = mockedBarGraphQL;
  }

  return new Promise(resolve => resolve(returnedValue));
});

describe('schema index', async () => {
  it('Should return a graphQl schema', async () => {
    const result = await schemaIndex();

    expect(result).toBeInstanceOf(GraphQLSchema);
  });

  it('Should return a graphQl schema with a concatenation of all schema present in folder', async () => {
    const expectedResult = buildSchema(mockedFooGraphQL + mockedBarGraphQL);
    const result = await schemaIndex();

    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult)); // TODO investigate why without JSON.Stringify it fail
  });

  it('Should not put concatenation of index.js file in the concatenation', async () => {
    const resultWithIndex = buildSchema(mockedFooGraphQL
    + mockedBarGraphQL
    + mockedInvalidFileGraphQL);

    const result = await schemaIndex();

    expect(result).not.toEqual(resultWithIndex);
  });
});

