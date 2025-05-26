import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import {Memories} from '../models/Memory.js';

const router = express.Router();

const memoryRepository = AppDataSource.getRepository(Memories);

router.get('/get-memory/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if(isNaN(userId)){
            return res.status(400).json({
                success: false,
                message: "Provide Memory ID"
            })
        }
        const userMemory = await memoryRepository.find({
            where: {
                User: {id: userId}
            }
        });
        if (!userMemory || userMemory.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Memory Found"
            });
        }

        // Clean and convert media paths to public URLs
        const updatedMemories = userMemory.map(mem => ({
            ...mem,
            media: `https://memorydrop.onrender.com/${mem.media.replace(/\\/g, '/')}`
        }));
        return res.status(200).json({
            success: true,
            message: "Memory Fetched Successfully",
            memory: updatedMemories
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
});
export default router;
