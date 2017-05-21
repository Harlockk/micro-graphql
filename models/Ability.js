const Model = require('./Model');
const Request = require('../utils/request');

class Ability extends Model {
  constructor({ id, name }, parentsModel = {}) {
    super(parentsModel, 'Ability', Ability);
    this.idArg = id;
    this.nameArg = name;
    this.apiData = this.request();
  }

  request() {
    return new Request()
      .path(['ability', this.idArg || this.nameArg])
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

  async generation() {
    const Generation = this.getModel('Generation');
    const { generation } = await this.apiData;
    return new Generation(generation, this.models);
  }
}

module.exports = Ability;
