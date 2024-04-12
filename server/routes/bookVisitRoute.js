import express from "express";
import { createBookingVisit,getAllBookVisit,editBookingVisit } from "../controllers/bookVisitCntrl.js";
const router = express.Router();

router.post("/bookVisit", createBookingVisit)
router.post("/allBookings", getAllBookVisit);
router.put("/edit/:id", editBookingVisit)
export {router as bookVisitRoute}