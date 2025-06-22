import { model, Schema } from "mongoose";
import { IBorrow} from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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

},
{
    versionKey:false,
    timestamps: true
}
)
borrowSchema.pre("save",async function(){
    console.log("doc from post" + this);
    const borrowQuantity = this.quantity;
   const book = await Book.findById(this.book)
if(!book){
    throw new Error("Book Not found.")
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
   await book.save();
})



export const Borrow = model("Borrow",borrowSchema)