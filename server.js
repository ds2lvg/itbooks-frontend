const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();
const port = 3000;

app.prepare()
.then(() => {
  const server = express();

  // 새로고침시 페이지 렌더링용
  server.get('/book/:bookId', (req, res) => {
    const actualPage = '/book/detail';
    const queryParams = {bookId: req.params.bookId};
    app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    return handler(req, res);
  })

  server.listen(port, (err) => {
    if(err) throw err;
    console.log(`server on. port: ${port}`);
  });
})
.catch((err => {
  console.error(err.stack);
  process.exit(1);
}));