import { Types } from "mongoose";
import { Date } from "mongoose";

export interface IBorrow{
   book: Types.ObjectId;
    quantity : number,
    dueDate : Date,
    createdAt?: Date,  
  updatedAt?: Date,
}

