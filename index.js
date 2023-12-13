import express from "express"
import connection from "./DB/connection.js"
import userRouter from "./src/modules/users/user.routes.js"
import productRouter from "./src/modules/products/product.routes.js"

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(productRouter)

connection

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})