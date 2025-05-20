/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './src/Controllers/dbConnect.js';
import NewUserCreation from './src/Routes/NewUserRoute.js'
import NewMemoryCreation from './src/Routes/NewMemoryRoute.js';
import GetUserMemories from './src/Routes/GetUserMemoryRoute.js';
import UserLogin from './src/Routes/LoginRoute.js';
import DeleteMemory from './src/Routes/DeleteUserMemoryRoute.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use('/api', NewUserCreation);
app.use('/api', NewMemoryCreation);
app.use('/api', GetUserMemories);
app.use('/api', UserLogin);
app.use('/api', DeleteMemory);

app.listen('5000', () => {
    console.log('Server is Running on Port 5000');
    connectDB();
})