import { Request, Response } from "express";
import { Book } from "../models/books.model";
import express from "express"
export const booksRoutes = express.Router()

booksRoutes.post('/', async (req: Request, res: Response) => {

    const body = req.body

    try {
        const book = await Book.create(body)


        const {
            _id,
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available,
            createdAt,
            updatedAt,
        } = book.toObject();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: {
                _id,
                title,
                author,
                genre,
                isbn,
                description,
                copies,
                available,
                createdAt,
                updatedAt,
            },
        })
    } catch (error: any) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }


})
booksRoutes.get('/', async (req: Request, res: Response) => {

    const body = req.body
    const bookGenre = req.query.genre ? req.query.genre : ""

    let data = []
    if (bookGenre) {
        data = await Book.find({ genre: bookGenre }).sort({ "createdAt": -1 }).limit(10)
    } else {
       
        data = await Book.find()
    }

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data
    })

})
booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        book

    })


})

booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updatedBody = req.body;
    const data = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true })

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data
    })

})
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const data = await Book.findByIdAndDelete(bookId)

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })

})
