import express from 'express';
import AppDataSource from '../Controllers/dbConfig.js';
import { Album } from '../models/Album.js';
import { User } from '../models/User.js';

const router = express.Router();

const albumRepository = AppDataSource.getRepository(Album);
const userRepository = AppDataSource.getRepository(User)

router.post('/album', async (req, res) => {
    const {name, description, userId} = req.body
    if(!name || !description || !userId ){
        return res.status(400).json({
            success: false,
            message: "PLease Enter All Fields"
        });
    }

    try {
        const user = await userRepository.findOneBy({id: userId});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "No User Found"
            })
        };
        const newAlbum = albumRepository.create({
            name,
            description,
            User: user
        })
        const savedAlbum = await albumRepository.save(newAlbum);
        return res.status(201).json({
            success: true,
            message: "Album Created successfully",
            album: savedAlbum
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