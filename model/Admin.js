const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Admin = sequelize.define('admins',{
  id:{
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  fullName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  username:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
},{
  timestamps: false
})

module.exports = Admin;