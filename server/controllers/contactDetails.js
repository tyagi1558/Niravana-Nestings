import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Create a new contact detail
export const createContactDetail = asyncHandler(async (req, res) => {
    const { name, email, message, phone, subject } = req.body.data;

    try {
        const contactDetail = await prisma.contactDetails.create({
            data: {
                name,
                email,
                message,
                phone,
                subject,
            },
        });

        res.send({ message: "Contact detail created successfully", contactDetail });
    } catch (err) {
        console.log(err.stack);
        throw new Error(err.message);
    }
});

// Get all contact details
export const getAllContactDetails = asyncHandler(async (req, res) => {
    const contactDetails = await prisma.contactDetails.findMany({
        orderBy: {
            createdAt: "desc", // Assuming there's a createdAt field to order by creation time
        },
    });
    res.send(contactDetails);
});
