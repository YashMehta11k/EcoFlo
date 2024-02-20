import express from 'express';
import { getTransport,getTransportById ,addTransport,updateTransport,deleteTransport,createTransportReview} from '../controllers/transportController.js';
import {protect,admin} from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').get(getTransport).post(protect,admin,addTransport);
router.route('/:id').get(getTransportById).put(protect, admin, updateTransport).delete(protect,admin,deleteTransport);
router.route('/:id/reviews').post(protect,createTransportReview);


export default router;

