import express from "express";
import { createBookingVisit,getAllBookVisit } from "../controllers/bookVisitCntrl.js";
const router = express.Router();

router.post("/bookVisit", createBookingVisit)
router.post("/allBookings", getAllBookVisit);


export {router as bookVisitRoute}