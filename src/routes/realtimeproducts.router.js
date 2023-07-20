import { Router } from "express";
import { __dirname } from "../utils.js";
import { getProductsList } from "../services/productUtils.js";


const realtimerouter = Router();

realtimerouter.get("/", (req, res) => {
    const products = getProductsList();
    res.render("realtimeproducts", {products});
});

export default realtimerouter
