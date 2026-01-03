import express from 'express';
import isLoggedin from '../middlewares/isLoggedin.js';
import upload from '../middlewares/multer.js';
import {addcomment, addnewpost, bookmarkpost, deletepost, dislikepost, getAllpost, getcommentofpost, getuserpost, likepost} from '../controllers/post.controller.js'

const router = express.Router();

router.route("/addpost").post(isLoggedin , upload.single("image"),addnewpost);
router.route("/all").get(isLoggedin , getAllpost);
router.route("/userpost/all").get(isLoggedin , getuserpost);
router.route("/:id/like").get(isLoggedin , likepost);
router.route("/:id/dislike").get(isLoggedin , dislikepost);
router.route("/:id/comment").post(isLoggedin ,addcomment);
router.route("/:id/comment/all").get(isLoggedin ,getcommentofpost);
router.route("/delete/:id").delete(isLoggedin ,deletepost);
router.route("/:id/bookmark").get(isLoggedin ,bookmarkpost);

export default router;