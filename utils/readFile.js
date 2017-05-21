const fs = require('fs');

module.exports = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, content) => {
    if (err) {
      return reject(err);
    }

    return resolve(content);
  });
});
