// // const swaggerUi = require('swagger-ui-express');
// // const swaggerJsdoc = require('swagger-jsdoc');

// // const options = {
// //   definition: {
// //     openapi: '3.0.0',
// //     info: {
// //       title: 'Your API Name',
// //       version: '1.0.0',
// //       description: 'A short description of your API',
// //     },
// //     servers: [
// //       {
// //         url: "http://localhost:8080/",
// //         description: "Local server"
// //       },
// //     ],
// //   },
// //   apis: ['./routes/*.js'], // Path to the API docs
// // };

// // const specs = swaggerJsdoc(options);

// // module.exports = (app) => {
// //   app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
// // };


// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
//     const options = {
//       definition: {
//         openapi: '3.0.0',
//         info: {
//           title: 'Mini Blog API',
//           description: "API endpoints for a mini blog services documented on swagger",
//           contact: {
//             name: "Desmond Obisi",
//             email: "info@miniblog.com",
//             url: "https://github.com/DesmondSanctity/node-js-swagger"
//           },
//           version: '1.0.0',
//         },
//         servers: [
//           {
//             url: "http://localhost:8080/",
//             description: "Local server"
//           },
//         ],
//         securityDefinitions: {
//           bearerAuth: {
//               type: 'apiKey',
//               name: 'Authorization',
//               scheme: 'bearer',
//               in: 'header',
//           },
//       }
//       },

//       // looks for configuration in specified directories
//       apis: ['./routes/*.js'],
//     }
//     const swaggerSpec = swaggerJsdoc(options)
//     module.exports = function swaggerDocs(app, port) {
//       // Swagger Page
//       app.use('/app1', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//       // Documentation in JSON format
//       app.get('/docs.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json')
//         res.send(swaggerSpec)
//       })
//     }

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog API',
      description: "API endpoints for a mini blog service documented with Swagger",
      contact: {
        name: "Desmond Obisi",
        email: "info@miniblog.com",
        url: "https://github.com/DesmondSanctity/node-js-swagger"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = function swaggerDocs(app) {
  app.use('/app1', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
