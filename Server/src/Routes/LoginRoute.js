/* eslint-disable no-undef */
import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Fill All Fields"
        });
    }
    try {
        const user = await userRepository.findOne({where: {email}});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "No User Found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Password Incorrect"
            })
        }
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET_KEY );
        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            token: token,
            user: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message : "Internal Server Error"
        })
    }
})
export default router;