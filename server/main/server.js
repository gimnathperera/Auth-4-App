const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const chalk = require('chalk');
const moment = require('moment');

const routes = require('./routes');
const response = require('./configurations/response');
app.use(fileupload());

//init middlewares
app.use(express.json({ extended: false }));

//allowed cross-origin
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type, Accept, Authorization, token'
  );
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    let reqData = {
      method: req.method,
      body: req.body,
      query: req.query,
      peram: req.peram,
    };

    console.log(chalk.green(req.url, JSON.stringify(reqData)));
    next();
  }
});

app.use('/api/', routes);

app.use((req, res, next) => {
  response.fail(req, res, response.messages.invalid_url);
  return;
});

//keep the .env config name to port as PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.green(
      `✓ Server started on port ${PORT} at ` +
        moment().format('YYYY-MM-DD HH:mm')
    )
  );
});
