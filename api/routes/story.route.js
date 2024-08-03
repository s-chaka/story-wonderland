import express from 'express';
import { createFirstSegment, createNextSegment, endStorySegment} from '../controllers/story.controller.js';


const router = express.Router();

router.post("/generate-story", createFirstSegment);
router.post("/continue-story", createNextSegment);
router.post("/end-story", endStorySegment);

export default router;