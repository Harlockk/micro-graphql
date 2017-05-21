const Model = require('./Model');

class PokemonAbility extends Model {
  constructor({ isHidden, slot, name }, parentsModel = {}) {
    super(parentsModel, 'PokemonAbility', PokemonAbility);
    this.isHidden = isHidden;
    this.slot = slot;
    this.name = name;
  }

  ability() {
    const Ability = this.getModel('Ability');
    const name = this.name;
    return new Ability({ name }, this.models);
  }
}

module.exports = PokemonAbility;
