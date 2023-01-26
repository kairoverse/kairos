'use strict';
import { Router } from './router/index.js';

export const main = (event, context, callback) => {
  console.time('lambda')
  const router = new Router(event, context, callback);

  router
    .get('/hello', async (ctx) => {
      return ctx.res(200, {
        message: 'GET Hello World',
        req: ctx.req,
        time: console.timeEnd('lambda')
      });
    })
    .post('/hello/{id}', (ctx) => {
      return ctx.res(200, {
        message: 'POST Hello World',
        params: ctx.req.params,
        time: console.timeEnd('lambda')
      });
    });
};
