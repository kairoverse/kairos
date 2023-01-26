import { bodyparser } from './util.js';

export class Router {
  #path;
  #method;

  #event;
  #context;
  #callback;

  constructor(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    this.#path = event.resource;
    this.#method = event.httpMethod;

    this.#event = event;
    this.#context = context;
    this.#callback = callback;
  }

  #route(path, handler, method) {
    if (path === this.#path && this.#method === method) {
      try {
        if (this.#method !== 'GET')
          this.#event.body = JSON.parse(this.#event.body);
        const that = this;
        handler({
          req: bodyparser(that.#event, that.#context),
          res(statusCode, body) {
            that.#callback(null, that.#stringify(statusCode, body));
          },
        });
      } catch (e) {
        console.log('🚀 ~ file: index.js:38 ~ Router ~ #route ~ e', e);
        this.#callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            message: 'Something went wrong',
          }),
        });
      }
    }
  }

  get(path, handler) {
    this.#route(path, handler, 'GET');
    return this;
  }

  post(path, handler) {
    this.#route(path, handler, 'POST');
    return this;
  }

  #stringify(statusCode, body) {
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  }
}
