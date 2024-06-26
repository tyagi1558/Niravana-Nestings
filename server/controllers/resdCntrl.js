import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    mail,
    title,
    description,
    price,
    address,
    area,
    country,
    city,
    type,
    propertySubtype,
    facilities,
    amenities,
    images,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        mail,
        title,
        description,
        price,
        address,
        area,
        country,
        city,
        type,
        propertySubtype,
        // Check if facilities is null, if not include it, otherwise exclude it
        ...(facilities !== null && { facilities }),
        amenities,
        images,
      },
    });
    console.log("just", req.body.data)

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with the same address already exists");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const [residencies, count] = await Promise.all([
    prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.residency.count(),
  ]);
  
  res.json({ count,residencies });
});


// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
