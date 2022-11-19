import express from 'express';
import {getClientById, getSales, getSalesById} from "../controllers/sales.controllers.js";

const router = express.Router();

router.get("/api/sales", getSales);
router.get("/api/sales/id/:_id", getSalesById);
router.get("/api/sales/id/client/:id_client", getClientById)

export default router;
