import {Router} from "express"

import * as userController from "./user.controller.js"

const router = Router()

router.post("/addUser", userController.addUser)

router.put("/updateUser", userController.updateUser)

router.delete("/deleteUser/:id", userController.deleteUser)

router.get("/searchUsera", userController.listUserBya)

router.get("/searchUserByID/:id", userController.searchUserByID)

router.get("/listUsers", userController.listUsers)

router.get("/usersProducts", userController.usersProducts)

export default router

