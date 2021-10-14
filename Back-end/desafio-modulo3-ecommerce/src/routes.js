const express = require("express");
const route = express();
const userController = require("./controllers/user.js");
const productController = require("./controllers/product.js");
const loginController = require("./controllers/login.js");
const authentication = require("./Middlewares/authentication.js");

route.post("/usuario", userController.create);
route.post("/login", loginController.login);

route.use(authentication);

route.get("/usuario", userController.get);
route.put("/usuario", userController.update);

route.get("/produtos/", productController.getAll);
route.get("/produtos/:id", productController.get);
route.post("/produtos", productController.create);
route.put("/produtos/:id", productController.update);
route.delete("/produtos/:id", productController.deleteProduct);

module.exports = route;
