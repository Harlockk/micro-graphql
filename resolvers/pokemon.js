const Pokemon = require('../models/Pokemon');

async function pokemonResolver({ id, name }) {
  return new Pokemon({ id, name });
}

module.exports = pokemonResolver;
