class Model {
  constructor(parentsModel, modelName, model) {
    this.models = Object.assign({}, parentsModel, { [modelName]: model });
  }

  getModel(name) {
    return this.models[name] || require(`./${name}`); // eslint-disable-line
  }
}

module.exports = Model;
