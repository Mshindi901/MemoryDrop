import express from 'express';
import { Album } from '../models/Album.js';
import AppDataSource from '../Controllers/dbConfig.js';

const router = express.Router();

const albumRepository = AppDataSource.getRepository(Album);

router.get('/album/userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        return res.status(400).json({
            success: false,
            message: "Provide User ID"
        })
    };
    try {
        const albums = await albumRepository.find({
            where: {
                User: {
                    id: userId
                }
            }
        });
        if(albums.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Albums Found"
            });
        };
        return res.status(200).json({
            success: true,
            message: "Albums Found Successfully",
            albums: albums
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
});
export default router;