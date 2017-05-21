let returnValue = {};

const axios = {
  __setReturnValue: ((expectedReturnValue) => {
    returnValue = expectedReturnValue;
  }),
  get: jest.fn(() => (
    new Promise((resolve, reject) => (
      returnValue instanceof Error ? reject(returnValue) : resolve(returnValue)
    ))
  )),
};

module.exports = axios;
