const Sequelize = require('sequelize');
# TODO : change db credentials {dbname, username, password}
const sequelize = new Sequelize(
	"arraign",
	"root",
	"", {
		host: "localhost",
		dialect: 'mysql',
	}
);

module.exports = sequelize;
