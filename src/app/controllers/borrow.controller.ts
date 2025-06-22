import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model"
import { z } from "zod"
export const borrowRoutes = express.Router()



borrowRoutes.post('/', async (req: Request, res: Response) => {

    const body = req.body

    try{
    const data = await Borrow.create(body)


    const {
        _id,
        book,
        quantity,
        dueDate,
        createdAt,
        updatedAt
    } = data.toObject();
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: {
            _id,
            book,
            quantity,
            dueDate,
            createdAt,
            updatedAt
        },
    })
    }
catch (error: any) {
  res.status(400).json({
    message: "Validation failed",
    success: false,
    error: {
      name: error.name,
      message: error.message,
      
    },
  });
}


})
borrowRoutes.get('/', async (req: Request, res: Response) => {

    const body = req.body
    // const data = await Borrow.find().populate('book')
    const data = await Borrow.aggregate([
       {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
      
    },
{ $unwind: "$book" },
{
      $project: {
         _id: 0,
          
        book: {
            
          title: "$book.title",
          isbn: "$book.isbn"
        },
       totalQuantity: "$totalQuantity"
      }
    }
    ])


    res.status(201).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data
    })



})