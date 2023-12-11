const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const route = require('./routes/index');
const bodyParser = require('body-parser');
const handleError = require('./common/error');
// require('./database/mongoose');

const db = require('./models/index.js');

db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log('Synced db.');
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use('/api/v1', route);

app.use((err, req, res, next) => {
  handleError(err, req, res);
});

app.listen(port, () => {
  console.log('Server listening on ' + port);
  // eslint-disable-next-line linebreak-style
});
