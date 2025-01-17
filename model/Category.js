const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Category = sequelize.define('category',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
},{
  timestamps: false
})

module.exports = Category;