const express = require('express');
const router = express.Router();
const { registerHandler, loginHandler } = require('../controller/admin');
const { createCategory, deleteCategory, getAllCategories, updateCategory } = require('../controller/category');
const { validateLogin } = require('../middleware/validation');
const { upload } = require('../middleware/upload')
const { createMenu, deleteMenu, getAllMenu, updateMenu } = require('../controller/menu');

router.post("/admin/register", registerHandler);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin login
 *     description: Login and get a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             usernameOrEmail: john.doe@example.com
 *             password: securepassword
 *     responses:
 *       200:
 *         description: Login success with a token.
 *       400:
 *         description: Wrong email/username or password.
 *       500:
 *         description: Server error.
 */

router.post("/admin/login", loginHandler);

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: Retrieve all categories
 *     description: Get a list of all categories.
 *     responses:
 *       200:
 *         description: Successful response with a list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       500:
 *         description: Server error.
 */

router.get("/category", getAllCategories)

/**
 * @swagger
 * /category/create:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     description: Add a new category to the database.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: Snacks
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       409:
 *         description: Category already exists.
 *       500:
 *         description: Server error.
 */

router.post("/category/create", validateLogin, createCategory)

/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update a category
 *     description: Update the name of a category by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: Beverages
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       404:
 *         description: Category not found.
 *       409:
 *         description: Category already exists.
 *       500:
 *         description: Server error.
*/

router.put("/category/update/:id", validateLogin, updateCategory)

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category
 *     description: Delete a category by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 123
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server error.
 */

router.delete("/category/delete/:id", validateLogin, deleteCategory)

/**
 * @swagger
 * /menu:
 *   get:
 *     tags:
 *       - Menu
 *     summary: Get all menus
 *     description: Retrieves all the menus in the system.
 *     responses:
 *       200:
 *         description: A list of all menus.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *                   pic:
 *                     type: string
 *                   categoryId:
 *                     type: integer
 *             example:
 *               - id: 1
 *                 name: Coke
 *                 desc: "Soft drink"
 *                 price: 2.99
 *                 pic: "coke.jpg"
 *                 categoryId: 1
 *               - id: 2
 *                 name: Coffee
 *                 desc: "Hot brewed coffee"
 *                 price: 3.50
 *                 pic: "coffee.jpg"
 *                 categoryId: 1
 */

router.get('/menu', getAllMenu)

/**
 * @swagger
 * /menu/create:
 *   post:
 *     tags: [Menu]
 *     summary: Create a new menu item
 *     description: Create a new menu item and optionally upload a picture for the menu item.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the menu item.
 *                 example: "Spaghetti Bolognese"
 *               desc:
 *                 type: string
 *                 description: A short description of the menu item.
 *                 example: "Classic Italian spaghetti with a rich tomato and meat sauce."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the menu item.
 *                 example: 12.99
 *               categoryId:
 *                 type: string
 *                 description: The category ID for the menu item.
 *                 example: "1"
 *               pic:
 *                 type: string
 *                 format: binary
 *                 description: An optional image of the menu item (JPEG, JPG, PNG).
 *     responses:
 *       201:
 *         description: Menu item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "Menu added successfully."
 *                 menu:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "menu_12345"
 *                     name:
 *                       type: string
 *                       example: "Spaghetti Bolognese"
 *                     desc:
 *                       type: string
 *                       example: "Classic Italian spaghetti with a rich tomato and meat sauce."
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 12.99
 *                     categoryId:
 *                       type: string
 *                       example: "1"
 *                     pic:
 *                       type: string
 *                       example: "https://example.com/menu/menu_12345.jpg"
 *       400:
 *         description: Invalid input data or file format error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error: Only JPEG, JPG, and PNG files are allowed!"
 *       404:
 *         description: Category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Category not found!"
*/

router.post('/menu/create', validateLogin, upload.single('pic'), createMenu)

/**
 * @swagger
 * /menu/update/{id}:
 *   put:
 *     tags:
 *       - Menu
 *     summary: Update an existing menu
 *     description: Updates the details of a menu, including name, description, price, category, and picture (optional).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the menu to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the menu item.
 *                 example: "Spaghetti Bolognese"
 *               desc:
 *                 type: string
 *                 description: A short description of the menu item.
 *                 example: "Classic Italian spaghetti with a rich tomato and meat sauce."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the menu item.
 *                 example: 12.99
 *               categoryId:
 *                 type: string
 *                 description: The category ID for the menu item.
 *                 example: "1"
 *               pic:
 *                 type: string
 *                 format: binary
 *                 description: An optional image of the menu item (JPEG, JPG, PNG).
 *     responses:
 *       200:
 *         description: Menu updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 menu:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     desc:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     pic:
 *                       type: string
 *                     categoryId:
 *                       type: integer
 *       404:
 *         description: Menu or category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.put('/menu/update/:id', validateLogin, upload.single('pic'), updateMenu)

/**
 * @swagger
 * /menu/delete/{id}:
 *   delete:
 *     tags: [Menu]
 *     summary: Delete a menu
 *     description: Delete a menu by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 123
 *     responses:
 *       200:
 *         description: Menu deleted successfully.
 *       404:
 *         description: Menu not found.
 *       500:
 *         description: Server error.
 */

router.delete('/menu/delete/:id', validateLogin, deleteMenu)

module.exports = router;