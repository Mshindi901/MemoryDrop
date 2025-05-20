import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import {Memories} from '../models/Memory.js';

const router = express.Router();

const memoryRepository = AppDataSource.getRepository(Memories);

router.delete('/delete-memory/:memoryId', async (req, res) => {
    try {
        const memoryId = parseInt(req.params.memoryId);
        if(isNaN(memoryId)){
            return res.status(400).json({
                success: false,
                message: "Provide Memory ID"
            })
        }
        const userMemory = await memoryRepository.findOne({
            where: {id: memoryId}
        });
        if(userMemory){
            await memoryRepository.remove(userMemory);
        }
        return res.status(200).json({
            success: true,
            message: "Memory Deleted Successfully",
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