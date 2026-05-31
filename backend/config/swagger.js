const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PAW API",
      version: "1.0.0",
      description: "Documentação da API do projeto PAW",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./routes/API/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;