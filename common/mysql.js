const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	"arraign",
	"root",
	"", {
		host: "localhost",
		dialect: 'mysql',
	}
);

module.exports = sequelize;