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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const data = yield borrow_model_1.Borrow.create(body);
        const { _id, book, quantity, dueDate, createdAt, updatedAt } = data.toObject();
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
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
}));
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // const data = await Borrow.find().populate('book')
    const data = yield borrow_model_1.Borrow.aggregate([
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
    ]);
    res.status(201).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data
    });
}));
