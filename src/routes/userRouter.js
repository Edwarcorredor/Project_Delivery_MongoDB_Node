import { Router } from "express";
import { userPost } from "../controllers/userController.js";

const router = Router();
router.post("/", userPost);

export default router;
