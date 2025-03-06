import { Router } from "express";
import loginControle from "../controllers/login.controller.js";


const router = Router();

router.post("/", loginControle.login);

export default router;