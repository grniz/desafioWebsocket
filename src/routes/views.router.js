import { Router } from "express";
import { __filename, __dirname } from "../utils.js";
import { getProductsList } from "../services/productUtils.js";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  const products = getProductsList();

  res.render("home", { products });
});

export default productRouter;