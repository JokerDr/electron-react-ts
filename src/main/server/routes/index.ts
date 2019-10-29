import Router from 'koa-router';

const router: Router = new Router();

router.get('/test', async (ctx: any, next: any) => {
  ctx.status = 200;
  next();
})

export default router;
