import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createBookingVisit = asyncHandler(async (req, res) => {
    const { name, date, phone, city } = req.body.data;
  console.log(req.body.data)
    try {
      const bookingVisit = await prisma.BookVisit.create({
        data: req.body.data
      });
  
      res.send({ message: "Booking visit created successfully", bookingVisit });
    } catch (err) {
      throw new Error(err.message);
    }
  });
  

  // function to get all the documents/residencies
export const getAllBookVisit = asyncHandler(async (req, res) => {
    const bookVisit = await prisma.BookVisit.findMany({
      orderBy: {
        date: "desc",
      },
    });
    res.send(bookVisit);
  });