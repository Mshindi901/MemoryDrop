import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import {User} from '../models/User.js';
import bcryptjs from 'bcryptjs';


const router = express.Router();


const userRepository = AppDataSource.getRepository(User);

router.post('/user', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(404).json({
                success: false,
                message: "Please Fill All the Fields"
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = userRepository.create({username, email, password: hashedPassword});
        const savedUser = await userRepository.save(newUser)
        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: savedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
})
export default router;