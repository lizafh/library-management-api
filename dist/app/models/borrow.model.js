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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1,got {VALUE}"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        }
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("doc from post" + this);
        const borrowQuantity = this.quantity;
        const book = yield books_model_1.Book.findById(this.book);
        if (!book) {
            throw new Error("Book Not found.");
        }
        // Check availability
        if (book.copies < borrowQuantity) {
            throw Error(`Only ${book.copies} copies are available.`);
        }
        //deduct quantity
        book.copies = book.copies - borrowQuantity;
        // Set available = false if no copies left
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
    });
});
// borrowSchema.post("save",function(doc,next){
//     console.log("doc from post" + doc);
//     next;
// })
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
