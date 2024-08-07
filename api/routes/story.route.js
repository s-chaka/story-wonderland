import express from 'express';
import { createFirstSegment, createNextSegment, endStorySegment, saveStory, getSavedStories} from '../controllers/story.controller.js';

const router = express.Router();

router.post("/generate-story", createFirstSegment);
router.post("/continue-story", createNextSegment);
router.post("/end-story", endStorySegment);
router.post("/save-story", saveStory);
router.get("/saved-stories/:userId", getSavedStories);

export default router;