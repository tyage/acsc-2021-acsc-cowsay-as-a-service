import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import child_process from 'child_process';

const settings = {};

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.state.user = ctx.cookies.get('username');
  await next();
});

router.get('/', (ctx, next) => {
  ctx.body = `
<form action="/cowsay" method="GET">
  <input type="text" name="user" placeholder="Username">
  <input type="submit" value="Login">
</form>
<script>
document.querySelector('form').addEventListener('submit', () => {
  const username = document.querySelector('input[name="user"]').value;
  document.cookie = 'username=' + username;
});
</script>
`;
  next();
});

router.get('/cowsay', (ctx, next) => {
  const setting = settings[ctx.state.user];
  const color = setting?.color || '#000000';

  let cowsay = '';
  if (ctx.request.query.say) {
    const result = child_process.spawnSync('/usr/games/cowsay', [ctx.request.query.say], { timeout: 500 });
    cowsay = result.stdout.toString();
  }

  ctx.body = `
<form action="/setting/color" method="POST">
  <input type="color" name="value" value="${color}">
  <input type="submit" value="Change Color">
</form>

<form action="/cowsay" method="GET">
  <input type="text" name="say" placeholder="hello">
  <input type="submit" value="Say">
</form>

<pre style="color: ${color}">
${cowsay}
</pre>
`;
});

router.post('/setting/:name', (ctx, next) => {
  if (!settings[ctx.state.user]) {
    settings[ctx.state.user] = {};
  }
  const setting = settings[ctx.state.user];
  setting[ctx.params.name] = ctx.request.body.value;
  ctx.redirect('/cowsay');
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
