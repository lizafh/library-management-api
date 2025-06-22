// 0nxhwZbA4RCBExQ9
// libraryManagement

import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';


let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://libraryManagement:0nxhwZbA4RCBExQ9@cluster0.ynyb0.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to mongodb using mongodb') 
        server = app.listen(PORT, () => {
                console.log(`App is listening on port ${PORT}`)
            })
    } catch (error) {
        console.log(error);
    }
}

main()

