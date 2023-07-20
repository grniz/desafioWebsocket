import Express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from "./routes/views.router.js";
import {Server} from 'socket.io' 
import realtimerouter from "./routes/realtimeproducts.router.js";
import { saveProduct } from "./services/productUtils.js";
import { deleteProduct } from "./services/productUtils.js";

const app = Express();
const PORT = 3000;

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Express.static("public"))

app.use("/", productRouter);
app.use("/realtimeproducts", realtimerouter)

 
app.get("/", (req, res) => {
    res.render("hello world");
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);



const httpServer = app.listen(PORT, () => {
    console.log(`servidor corriendo desde ${PORT}`);
})

httpServer.on("error", (error) => {
    console.log(`error: ${error}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente se ha conectado");
    

   socket.on('message', (data) => {
        console.log(data)
    })

   
    socket.emit('render', "Me estoy comunicando desde el servidor")

    socket.on("addProduct", product => {
        saveProduct(product)
        socket.emit("show-new-products", product)
    })

    socket.on("delete-product", productId => {
        const {id} = productId
        deleteProduct(id) 
        socket.emit('delete-product', id)
    })
    
})