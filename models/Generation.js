const Model = require('./Model');
const Request = require('../utils/request');

class Generation extends Model {
  constructor({ id, name }, parentsModel = {}) {
    super(parentsModel, 'Generation', Generation);
    this.idArg = id;
    this.nameArg = name;
    this.apiData = this.request();
  }

  request() {
    return new Request()
      .path(['generation', this.idArg || this.nameArg])
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

  async mainRegion() {
    const { main_region: mainRegion } = await this.apiData;
    return mainRegion.name;
  }

  async abilities() {
    const Ability = this.getModel('Ability');
    const { abilities } = await this.apiData;
    return abilities.map(ability => new Ability(ability, this.models));
  }
}

module.exports = Generation;
