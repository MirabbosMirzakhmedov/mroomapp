/* jshint esversion: 6 */
/* jshint strict: false */

const express = require('express');
const app = express();
const port = 3000;

const { staticAssets, serveFile } = require('./assets');

staticAssets(app);

app.get('*', serveFile(__dirname + '/app/app.html'));

app.listen(port, () => {
  console.log(`App started on port http://127.0.0.1:${port}`);
});