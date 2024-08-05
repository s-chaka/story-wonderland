import express from 'express';
import { signup, signin, google, signout, getUserId } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get('/signout', signout)
router.get('/get-user-id', getUserId);

export default router;