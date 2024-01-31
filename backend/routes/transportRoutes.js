import express from 'express';
import { getTransport,getTransportById } from '../controllers/transportController.js';

const router=express.Router();

router.route('/').get(getTransport);
router.route('/:id').get(getTransportById);

export default router;

