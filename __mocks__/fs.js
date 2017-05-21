const fs = jest.genMockFromModule('fs');

let error = null;

fs.readdir = (path, options, callback) => callback(error, ['index.js', 'foo.js', 'bar.js']);
fs.readFile = (path, options, callback) => callback(error, 'Lorem ipsum');
fs.__setError = errorProvided => (error = errorProvided); // eslint-disable-line

module.exports = fs;
