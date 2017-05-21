const fs = require('fs');

module.exports = path => new Promise((resolve, reject) => {
  fs.readdir(path, 'utf8', (err, files) => {
    if (err) {
      return reject(err);
    }

    return resolve(files);
  });
});
