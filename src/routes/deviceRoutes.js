import { Router } from "express";
import * as controller from "../controllers/deviceController.js";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.put("/name/:name", controller.updateByName);
router.delete("/:id", controller.remove);

export default router;