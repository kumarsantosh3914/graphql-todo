import mongoose from "mongoose";

export default interface ITodo extends mongoose.Document {
    title: string;
    completed: boolean;
    tags: string[];
}