import { Types } from "mongoose";

export interface IBooks{
  title: string,
  author: string,
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
  isbn: string,
  description?: string,
  copies: number,
  available?: boolean,
 createdAt?: Date,  
  updatedAt?: Date,
 
  
}

export interface BookInstanceMethod{
      borrowCopies(quantity: number):number  ;
}