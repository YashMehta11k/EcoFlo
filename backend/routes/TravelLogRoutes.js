import express from 'express';
import {
    addTrips,
    getTravelLogById,
    updateTripToProofUploaded,
    updateTripToVerified,
    getTravelLog,
    getMyTravelLog
} from '../controllers/TravelLogController.js';
const router=express.Router();

import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').post(protect,addTrips).get(protect,admin,getTravelLog);
router.route('/myTrips').get(protect,getMyTravelLog);
router.route('/:id').get(protect,getTravelLogById);
router.route('/:id/upload').put(protect,updateTripToProofUploaded);
router.route('/:id/verify').put(protect,updateTripToVerified);

export default router;

