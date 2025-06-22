import { Model, model, Schema } from "mongoose"

import { BookInstanceMethod, IBooks } from "../interfaces/books.interface"

const bookSchema = new Schema<IBooks, Model<IBooks>, BookInstanceMethod >(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      enum: {
        values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        message: 'Genre must be one of the predefined values from "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY", got {VALUE}'
      },
      required: [true, 'Genre is required'],
    },
    isbn: {
      type: String,
      unique: [true, 'isbn should be unique'],
      required: [true, 'ISBN is required'],
      
    },
    description: {
      type: String,
      required: false,
    },
    copies: {
      type: Number,
      required: [true, 'Copies field is required'],
      min: [0, 'Copies cannot be negative got {VALUE}']
    },
    available: {
      type: Boolean,
      default: true,
    },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.method("borrowCopies",async function(quantity:number){

    if(this.copies < quantity){
      return {
         success: false, 
         message: `Only ${this.copies} copies are available`
         };
    }

  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
   await this.save();
  return { success: true };

})

bookSchema.post("save", function (doc) {
  console.log(`New book added: "${doc.title}" by ${doc.author}`);
});

export const Book = model<IBooks>("Book",bookSchema)
