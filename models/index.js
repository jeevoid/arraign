const sequelize  = require('../common/mysql');
const fs = require('fs');
const path = require('path');
const db = {};
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
db.sequelize = sequelize;

module.exports = db;