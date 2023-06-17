const jsonServer = require('json-server')
const server = jsonServer.create()
const database = __dirname.replace('backend', 'db.json')
const router = jsonServer.router(database)
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '*?page=*': '$1?_page=$2',
  '*&page=*': '$1&_page=$2',
  '*?pageSize=*': '$1?_limit=$2',
  '*&pageSize=*': '$1&_limit=$2',
  '/api/*': '/$1',
}))

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  const params = new URLSearchParams(req._parsedUrl.query);

  if (params.has('_page') && params.has('_limit')) {
    const count = res.get('X-Total-Count');
    const page = params.get('_page');
    const pageSize = params.get('_limit');
    const hasNext = count > page * pageSize;
    res.locals.data = {
      total: count,
      hasNext: hasNext,
      items: res.locals.data,
    };
  } else if (res.locals.data.constructor === Array) {
    res.locals.data = { items: res.locals.data };
  }
  res.jsonp(res.locals.data);
}

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
