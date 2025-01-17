const sequelize = require("./db_connect");
const Admin = require('../model/Admin');
const Category = require('../model/Category');
const Menu = require('../model/Menu');

Category.hasMany(Menu,{ onDelete: 'cascade' })
Menu.belongsTo(Category,{ onDelete: 'cascade' })

const association = async ()=>{
  try {
      await sequelize.sync({});
  } catch (error) {
      console.log(error.message);
  }
}

module.exports = association; 