const listFiles = require('../utils/listFiles');

const excludedFiles = ['index.js', '__tests__', '__mocks__'];

module.exports = async () => {
  const files = await listFiles(__dirname);
  return files.filter(file => excludedFiles.indexOf(file) < 0)
    .map(file => file.replace('.js', ''))
    .reduce((acc, resolverName) => {
      const resolver = require('./' + resolverName); // eslint-disable-line
      acc[resolverName] = resolver;
      return acc;
    }, {});
};
