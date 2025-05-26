import express from 'express';
import { User } from '../models/User.js';
import AppDataSource from '../Controllers/dbConfig.js';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.get('/families/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid userId parameter',
    });
  }

  try {
    // Find user with families relation loaded
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['families', 'families.User', 'families.members', 'families.Album']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Return all families the user belongs to
    return res.status(200).json({
      success: true,
      families: user.families,
    });
  } catch (error) {
    console.error('Error fetching families:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
