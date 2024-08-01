import express from 'express';
import { createFirstSegment, createNextSegment} from '../controllers/story.controller.js';


const router = express.Router();

router.post("/generate-story", createFirstSegment);
router.post("/continue-story", createNextSegment);

export default router;