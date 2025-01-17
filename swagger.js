const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    components:{
			securitySchemes:{
					BearerAuth:{            
						type: 'http',
						scheme: 'bearer'
					}
			}
		},
    info: {
      title: 'Digitalized Canteen Menu',
      version: '1.0.0',
      description: 'API documentation for this system.',
    },
		
  },
	tags: [ 
		{ name: 'Admin', description: 'Operations related to admin' },
		{ name: 'Category', description: 'Operations related to categories' },
		{ name: 'Menu', description: 'Operations related to menus' },
	],
  apis: [
		'./routes/routes.js'
	], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;