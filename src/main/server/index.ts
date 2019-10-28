/** @format */

import koa from 'koa';
import serve from 'koa-static';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';

// import logger from 'koa-logger';


import router from './routes';

const app: koa = new koa();

app
  .use(cors())
  .use(bodyParser({
      jsonLimit: 'Infinity'
  }))
  .use(router.routes())
  // .use(logger())
  .use(serve(__dirname + '../../assets/', {
        maxage: 24 * 60 * 60 * 1000,
    })
  );

app.listen(8881, 'localhost');

export default ():koa => app;
