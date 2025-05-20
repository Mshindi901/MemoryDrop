import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import {Memories} from '../models/Memory.js';
import {User} from '../models/User.js';
import upload from '../middleware/multer.js';

const router = express.Router();

const memoryRepository = AppDataSource.getRepository(Memories);
const userRepository = AppDataSource.getRepository(User);

router.post('/memory',upload.single('media'), async (req, res) => {
    const {userId, description} = req.body;
    const media = req.file?.path
    if(!userId || !media || !description){
        return res.status(400).json({
            success:false,
            message: "Please Enter All Fields"
        })
    }
    try {
        const user = await userRepository.findOneBy({id: userId});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Not User"
            })
        }
        const newMemory = memoryRepository.create({
            User:user,
            media,
            description
        })
        const savedMemory = await memoryRepository.save(newMemory);
        return res.status(201).json({
            success: true,
            message: "Memory Added Successfully",
            memory: savedMemory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})
export default router;