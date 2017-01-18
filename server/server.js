const express = require('express');
const path = require('path');

const server = express();
let port = process.env.PORT || 3000;

server.use(express.static(path.resolve(__dirname, '../dist/')));

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html') );
});

server.listen(port, () => {
  console.log('Server is listening on port', port);
});
