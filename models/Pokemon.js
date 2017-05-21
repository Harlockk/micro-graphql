const Model = require('./Model');
const Request = require('../utils/request');

class Pokemon extends Model {
  constructor({ id, name }, parentsModel = {}) {
    super(parentsModel, 'Pokemon', Pokemon);
    this.idArg = id;
    this.nameArg = name;
    this.apiData = this.request();
  }

  request() {
    return new Request()
      .path(['pokemon', this.idArg || this.nameArg])
      .get();
  }

  async id() {
    const { id } = await this.apiData;
    return id;
  }

  async name() {
    const { name } = await this.apiData;
    return name;
  }

  async abilities() {
    const PokemonAbility = this.getModel('PokemonAbility');
    const { abilities } = await this.apiData;
    return abilities.map(({ ability, is_hidden, slot }) => new PokemonAbility({
      isHidden: is_hidden,
      slot,
      name: ability.name,
    }, this.models));
  }

  async height() {
    const { height } = await this.apiData;
    return height;
  }

  async weight() {
    const { weight } = await this.apiData;
    return weight;
  }
}

module.exports = Pokemon;
