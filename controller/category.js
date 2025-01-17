require('dotenv').config();
const Category = require('../model/Category');
const {Op} = require('sequelize');

const createCategory = async (req, res, next)=>{
  try{
    // take input
    const {name} = req.body

    // check if category already existed
    const existingCategory = await Category.findOne({
      where:{
        name
      }
    })

    // if category already existed    
    if(existingCategory){
      const error = new Error("Category already existed!");
			error.statusCode = 409;
			throw error;
    }

    // create new category
    const category = await Category.create({
      name
    })

    res.status(201).json({
			status: "Success",
			message: "Category added successfully.",
      category
		})

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const deleteCategory = async (req, res, next)=>{
  try{
    // take id from url
    const {id} = req.params

    // check if category exists
    const category = await Category.findByPk(id)
    if(!category){
      const error = new Error("Category not found!");
			error.statusCode = 404;
			throw error;
    }

    // delete category
    await category.destroy();

		res.status(200).json({
			status: "Success",
			message: "Category deleted successfully.",
		})

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const updateCategory = async (req, res, next)=>{
  try{
    // take id from url and name from body request
    const {id} = req.params
    const {name} = req.body

    // check if category id valid
    const category = await Category.findByPk(id)

    // if not found
    if(!category){
      const error = new Error("Category not found!");
			error.statusCode = 404;
			throw error;
    }

    // check if category with new name already exists
    const duplicateCategory = await Category.findOne({
      where: {
        name,
        id:{
          [Op.ne]:id
        }
      }
    })

    // if duplicate
    if(duplicateCategory){
      const error = new Error("Category already existed!");
			error.statusCode = 409;
			throw error;
    }

    // update field
    await category.update({name})

		res.status(200).json({
			status: "Success",
			message: "Category updated successfully.",
      category
		})

  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const getAllCategories = async  (req, res, next)=>{
  try{
    const categories = await Category.findAll()

    res.status(200).json({
			status: "Success",
			message: "Category retrieved successfully.",
      categories
		})
  }catch(error){
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

module.exports = {createCategory, deleteCategory, getAllCategories, updateCategory}