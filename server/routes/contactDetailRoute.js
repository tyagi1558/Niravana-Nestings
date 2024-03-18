import express from "express";
import { createContactDetail,getAllContactDetails } from "../controllers/contactDetails.js";
const router = express.Router();

router.post("/contactDetails", createContactDetail)
router.post("/allContacts", getAllContactDetails);


export {router as contactDetailRoute}