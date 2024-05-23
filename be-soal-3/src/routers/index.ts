import { Router } from "express";
import UserController from "../controllers/user";

const router = Router();

router.post('/Create', UserController.createUser)
router.get('/GetAll', UserController.getAllUsers)
router.get('/GetOne/:id', UserController.getUserById)
router.put('/Update/:id', UserController.updateUser)
router.delete('/Delete/:id', UserController.deleteUser)


export default router