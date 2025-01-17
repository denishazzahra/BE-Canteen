const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Menu = sequelize.define('menus',{
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
  desc:{
    type: Sequelize.STRING,
    allowNull: false
  },
  price:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  pic:{
    type: Sequelize.STRING,
    allowNull: true
  }
},{
  timestamps: false
})

module.exports = Menu;