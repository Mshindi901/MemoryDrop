import express from  'express';
import {Family} from '../models/Family.js';
import { User } from '../models/User.js';
import { Album } from '../models/Album.js';
import AppDataSource from '../Controllers/dbConfig.js';
const router = express.Router();


const familyRepository = AppDataSource.getRepository(Family);
const userRepository = AppDataSource.getRepository(User);
const albumRepository = AppDataSource.getRepository(Album);


router.post('/newFamily', async (req, res) => {
    const { name, description, userId, memberIds = [], albumId } = req.body;
    if(!name || !description|| !userId){
        return res.status(400).json(
            {
                success: false,
                message: 'Name and description are required'
            }
        );
    }
    try {
        const creator = await userRepository.findOneBy({ id: userId })
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        let album = null;
        if (albumId) {
            album = await albumRepository.findOneBy({ id: albumId });
            if (!album) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Album not found' 
                });
            };
            const newFamily = familyRepository.create({
                name,
                description,
                User: creator,
                Album: album,
                members: memberIds
            });
            const savedFamily = await familyRepository.save(newFamily);
            return res.status(201).json({
                success: true,
                message: 'Family created successfully',
                family: savedFamily
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});
export default router;