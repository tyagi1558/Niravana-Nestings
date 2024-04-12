import asyncHandler from "express-async-handler";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
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
// Function to get all booking visits with property names
export const getAllBookVisit = asyncHandler(async (req, res) => {
  try {
    const bookVisits = await prisma.BookVisit.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        Residency: {
          select: {
            title: true,
            city: true,
          },
        },
      },
    });

    // Map over each booking visit and format the response with property names
    const formattedBookVisits = bookVisits.map((visit) => ({
      ...visit,
      property: visit.Residency.title,
      city: visit.Residency.city,
    }));

    res.send(formattedBookVisits);
  } catch (err) {
    throw new Error(err.message);
  }
});


  // Function to edit a booking visit
export const editBookingVisit = asyncHandler(async (req, res) => {
  const { id } = req.body; 
  const newData = req.body.data; 
console.log("id: ", req.body, "new Data :", newData);
  try {
    const updatedBookingVisit = await prisma.BookVisit.update({
      where: { id }, 
      data: newData, 
    });

    res.send({ message: "Booking visit updated successfully", updatedBookingVisit });
  } catch (err) {
    throw new Error(err.message);
    console.log(err.stack)
  }
});

