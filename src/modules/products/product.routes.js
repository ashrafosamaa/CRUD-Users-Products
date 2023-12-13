import {Router} from 'express'
import * as productController from "./product.controller.js"

const router = Router()

router.get("/listProducts", productController.listProducts)

router.get("/lisProductMore", productController.lisProductMore)

router.delete("/deleteProduct/:userID", productController.deleteProduct)

router.put("/updateProduct/:userID", productController.updateProduct)

router.post("/addProduct", productController.addProduct)

export default router