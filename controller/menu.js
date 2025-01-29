require('dotenv').config();
const Menu = require('../model/Menu');
const Category = require('../model/Category');
const {Op} = require('sequelize');
const cloudinary = require('../util/cloudinary_config')
const fs = require('fs')

const createMenu = async (req, res, next)=>{
  try{
    // take all user inputs
    const {name, desc, price, categoryId} = req.body
    console.log('Request Body:', req.body);

    // check if category valid
    const category = await Category.findByPk(categoryId)
    if(!category){
      const error = new Error("Category not found!");
      error.statusCode = 404;
      throw error;
    }

    // create new menu
    const menu = await Menu.create({
      name,
      desc,
      price,
      categoryId
    })

    // if image is attached
    if(req.file){
      const file = req.file
      const uploadOption = {
        folder:'menu/',
        public_id:`menu_${menu.id}`,
        overwrite:true
      }
      const uploadFile = await cloudinary.uploader.upload(file.path,uploadOption)
      const imageUrl = uploadFile.secure_url
      await menu.update({ pic: imageUrl })
      fs.unlinkSync(file.path)
    }

    res.status(201).json({
      status: "Success",
      message: "Menu added successfully.",
      menu
    })

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const deleteMenu = async (req, res, next)=>{
  try{
    // take id from url
    const {id} = req.params

    // check if id exists
    const menu = await Menu.findByPk(id)

    // if menu doesnt exist
    if(!menu){
      const error = new Error("Menu not found!");
      error.statusCode = 404;
      throw error;
    }

    // if has image, delete image from storage
    if(menu.pic){
      await cloudinary.uploader.destroy(`menu/menu_${id}`)
    }

    // delete menu
    await menu.destroy()

    res.status(200).json({
      status: "Success",
      message: "Menu deleted successfully.",
    })
    
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const getAllMenu = async (req, res, next)=>{
  try{
    // take all menu, grouped by category
    const menu = await Category.findAll({
      include:{
        model:Menu,
      },
      order:[
        ['id', 'ASC']
      ]
    })

    res.status(200).json({
      status: "Success",
      message: "Menu retrieved successfully.",
      categories: menu
    })
    
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const updateMenu = async (req, res, next)=>{
  try{
    // take all user inputs from body and id from url
    const {id} = req.params
    const {name, desc, price, categoryId} = req.body

    // check if category valid
    const category = await Category.findByPk(categoryId)

    // if category invalid
    if(!category){
      const error = new Error("Category not found!");
      error.statusCode = 404;
      throw error;
    }

    // check if menu valid
    const menu = await Menu.findByPk(id)

    // if menu invalid
    if(!menu){
      const error = new Error("Menu not found!");
      error.statusCode = 404;
      throw error;
    }

    // update menu
    await menu.update({
      name,
      desc,
      price,
      categoryId
    })

    // if file attached (change picture)
    if(req.file){
      const file = req.file
      const uploadOption = {
        folder:'menu/',
        public_id:`menu_${menu.id}`,
        overwrite:true
      }
      const uploadFile = await cloudinary.uploader.upload(file.path,uploadOption)
      const imageUrl = uploadFile.secure_url
      await menu.update({ pic: imageUrl })
      fs.unlinkSync(file.path)
    }

    res.status(200).json({
      status: "Success",
      message: "Menu updated successfully.",
      menu
    })

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const getSpecificMenu = async (req, res, next)=>{
  try{
    const {id} = req.params
    const menu = await Menu.findByPk(id)
    if(!menu){
      const error = new Error("Menu not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      status: "Success",
      message: "Menu retrieved successfully.",
      menu
    })
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {createMenu, deleteMenu, getAllMenu, updateMenu, getSpecificMenu}