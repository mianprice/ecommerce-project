const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const body_parser = require('body-parser');
const uuid = require('uuid');
const app = express();
const pgp = require('pg-promise')();
const config = require('./config');
const db = pgp(config.db);

// Server listens on port 4040
app.listen(4040, () => {
  console.log('Server running on port 4040');
});
