const Generation = require('../models/Generation');

async function generationResolver({ id, name }) {
  return new Generation({ id, name });
}

module.exports = generationResolver;
