import express from "express";
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import chatRoutes from './chat.routes'
const router = express.Router()

router.use('/api/auth',authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/chat', chatRoutes);

export {router}