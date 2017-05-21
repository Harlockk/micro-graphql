const Request = require('../request');
const axios = require('axios');

describe('request helper', () => {
  describe('with no options', () => {
    it('should use default baseUrl', () => {
      const request = new Request();
      expect(request.url).toBe('https://pokeapi.co/api/v2');
    });

    it('should use default withLog', () => {
      const request = new Request();
      expect(request.withLog).toBe(true);
    });

    it('should use default log function', () => {
      const request = new Request();
      expect(request.logFn).toBe(console.log);
    });
  });

  describe('with options', () => {
    it('should use baseUrl from options', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      expect(request.url).toBe('https://domain.tld');
    });

    it('should use withLog from options', () => {
      const request = new Request({ withLog: false });
      expect(request.withLog).toBe(false);
    });

    it('should use log function from options', () => {
      const fakeLogFn = jest.fn();
      const request = new Request({ logFn: fakeLogFn });
      expect(request.logFn).toBe(fakeLogFn);
    });
  });

  describe('path method', () => {
    it('should return baseUrl with an ending / if no args', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      request.path();
      expect(request.url).toBe('https://domain.tld/');
    });

    it('should concat url to joined args (with /)', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      request.path(['path', 'params']);
      expect(request.url).toBe('https://domain.tld/path/params');
    });

    it('should return this', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      const returnedVar = request.path(['path', 'params']);
      expect(returnedVar).toBe(request);

    });
  });

  describe('log method', () => {
    it('should call logFn with log message when withLog is true', () => {
      const fakeLogFn = jest.fn();
      const request = new Request({ baseURL: 'https://domain.tld', withLog: true, logFn: fakeLogFn });

      request.log();

      expect(fakeLogFn).toBeCalledWith('Request to : https://domain.tld');
    });

    it('should not call logFn when withLog is false', () => {
      const fakeLogFn = jest.fn();
      const request = new Request({ baseURL: 'https://domain.tld', withLog: false, logFn: fakeLogFn });

      request.log();

      expect(fakeLogFn).not.toBeCalled();
    });
  });

  describe('get method', () => {
    it('should call axios.get method with url as param', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });

      request.path(['path', 'params']).get();

      expect(axios.get).toBeCalledWith('https://domain.tld/path/params');
    });

    it('should return result of axios.get.data', async () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      axios.__setReturnValue({ data: { foo: 'bar' } }); // eslint-disable-line

      const result = await request.get();

      expect(result).toEqual({ foo: 'bar' });
    });

    it('should call this.log method', () => {
      const request = new Request({ baseURL: 'https://domain.tld' });
      request.log = jest.fn();

      request.path(['path', 'params']).get();

      expect(request.log).toHaveBeenCalledTimes(1);
    });
  });
});
