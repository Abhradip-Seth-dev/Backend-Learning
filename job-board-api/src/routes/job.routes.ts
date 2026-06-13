import express from 'express';
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from '../controllers/job.controller';
import { restrictTo } from '../middleware/role.middleware';
import { protect } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/',getAllJobs);
router.get('/:id',getJobById);
router.post('/',protect,restrictTo('company'),createJob)
router.put('/:id',protect,restrictTo('company'),updateJob)
router.delete('/:id',protect,restrictTo('company'),deleteJob);

export default router