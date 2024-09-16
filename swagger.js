import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bracketizer",
      version: "1.0.0",
      description: "A brief description of your API",
    },
  },
  apis: ["./src/app/api/**/*.js", "./src/app/api/**/route.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
