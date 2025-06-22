"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const books_model_1 = require("../models/books.model");
const express_1 = __importDefault(require("express"));
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield books_model_1.Book.create(body);
        const { _id, title, author, genre, isbn, description, copies, available, createdAt, updatedAt, } = book.toObject();
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
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const bookGenre = req.query.genre ? req.query.genre : "";
    let data = [];
    if (bookGenre) {
        data = yield books_model_1.Book.find({ genre: bookGenre }).sort({ "createdAt": -1 }).limit(10);
    }
    else {
        data = yield books_model_1.Book.find();
    }
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data
    });
}));
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        book
    });
}));
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const data = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data
    });
}));
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield books_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
