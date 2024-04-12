import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  loginUser,
  getAllBookings,
  getAllFavorites,
  toFav,
} from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.post("/allBookings", getAllBookings);

export { router as userRoute };
