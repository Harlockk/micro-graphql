const path = require('path');
const { buildSchema } = require('graphql');

const readFile = require('../utils/readFile');
const listFiles = require('../utils/listFiles');

module.exports = async () => {
  const files = await listFiles(__dirname);
  const filesReadPromises = files
    .filter(file => file.indexOf('.graphql') >= 0)
    .map(file => readFile(path.join(__dirname, file)));
  const filesContent = await Promise.all(filesReadPromises);

  const content = filesContent.reduce((acc, fileContent) => acc + fileContent, '');

  return buildSchema(content);
};
