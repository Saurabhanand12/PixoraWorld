import express from 'express';
import { editProfile, followOrunfollow, getProfile, getsuggesteduser, login, logout, register } from '../controllers/user.controller.js';
import isLoggedin from '../middlewares/isLoggedin.js';
import upload from '../middlewares/multer.js'

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isLoggedin,getProfile);
router.route('/profile/edit').post(isLoggedin,upload.single('profilepic'),editProfile);
router.route('/suggested').get(isLoggedin,getsuggesteduser);
router.route('/followorunfollow/:id').post(isLoggedin,followOrunfollow);

export default router;
