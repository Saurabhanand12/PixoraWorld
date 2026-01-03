import cloudinary from "../utils/cloudinary.js";
import sharp from 'sharp';
import { post } from '../models/post.model.js'
import usermodel from "../models/user.model.js";
import { Comment } from '../models/comment.model.js'
import { populate } from "dotenv";
import { getReciverSocketId , io } from "../socket/socket.js";

export const addnewpost = async (req, res) => {
    try {
        const { captions } = req.body;
        const image = req.file;
        const authorid = req.id;

        if (!image) return res.status(401).json({ message: 'Image is required' });

        const optimizedimagebuffer = await sharp(image.buffer)
            .resize({ height: 800, width: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to datauri
        const fileuri = `data:image/jpeg;base64,${optimizedimagebuffer.toString('base64')}`;
        const cloudresponse = await cloudinary.uploader.upload(fileuri);
        const post1 = await post.create({
            captions,
            images: cloudresponse.secure_url,
            author: authorid
        });

        const user = await usermodel.findById(authorid);
        if (user) {
            user.posts.push(post1._id);
            await user.save();
        }

        await post1.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: "New post is Added",
            post1,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAllpost = async (req, res) => {
    try {
        const posts = await post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilepic' })
            .populate({
                path: "comments",
                model: "Comment",
                options: { sort: { createdAt: -1 } },
                populate: { path: 'author', select: 'username  profilepic' }
            });

        return res.status(200).json({
            posts,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getuserpost = async (req, res) => {
    try {
        const authorid = req.id;
        const post1 = await post.find({ author: authorid }).sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username,profilepic' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: { path: 'author', select: 'username,profilepic' }
            });

        return res.status(200).json({
            post1,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const likepost = async (req, res) => {
    try {
        const likekarnewalakiid = req.id;
        const postid = req.params.id;
        const post1 = await post.findById(postid);
        if (!post1) return res.status(404).json({ message: "post not found", success: false });

        await post1.updateOne({ $addToSet: { likes: likekarnewalakiid } });
        await post1.save();

        const userbh = await  usermodel.findById(likekarnewalakiid).select('username profilepic');
        const postownerid = post1.author.toString();
        if(postownerid != likekarnewalakiid){
            const notification = {
                type : 'like',
                userid : likekarnewalakiid,
                userDetail: userbh,
                postid,
                message:'Your Post was Liked '
            }
            const PostOwnerSocketId = getReciverSocketId(postownerid);
            io.to(PostOwnerSocketId).emit('notification',notification);
        }

        return res.status(200).json({ message: "Post Liked", success: true });

    } catch (error) {
        console.log(error);
    }
}

export const dislikepost = async (req, res) => {
    try {
        const likekarnewalakiid = req.id;
        const postid = req.params.id;
        const post1 = await post.findById(postid);
        if (!post1) return res.status(404).json({ message: "post not found", success: false });

        await post1.updateOne({ $pull: { likes: likekarnewalakiid } });
        await post1.save();

        const userbh = await usermodel.findById(likekarnewalakiid).select('username profilepic');
        const postownerid = post1.author.toString();
        if(postownerid !== likekarnewalakiid){
            const notification = {
                type : 'dislike',
                userid : likekarnewalakiid,
                userDetail: userbh,
                postid,
                message:'Your Post was Disliked '
            }
            const PostOwnerSocketId = getReciverSocketId(postownerid);
            io.to(PostOwnerSocketId).emit('notification',notification);
        }

        return res.status(200).json({ message: "Post Disliked", success: true });

    } catch (error) {
        console.log(error);
    }
}

export const addcomment = async (req, res) => {
    try {
        const postid = req.params.id
        const commentkarnewala = req.id;

        const { text } = req.body;

        const post1 = await post.findById(postid);

        if (!text) return res.status(400).json({ message: "Text is Required", success: false });

        const comment = await Comment.create({
            text,
            author: commentkarnewala,
            post: postid
        });
        
        await comment.populate({
            path: 'author',
            select: 'username profilepic'
        });

        post1.comments.push(comment._id);
        await post1.save();

        return res.status(201).json({
            message: "comment Added",
            comment,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const getcommentofpost = async (req, res) => {
    try {

        const postid = req.params.id;

        const comments = await post.findById({ post: postid }).populate('author', 'username', 'profilepic');

        if (!comments) return res.status(404).json({ message: "comments is not found", success: false });

        return res.starus(200).json({ success: true, comments });

    } catch (error) {
        console.log(error);
    }
}

export const deletepost = async (req, res) => {
    try {
        const postid = req.params.id;
        const authorid = req.id;

        const post2 = await post.findById(postid);

        if (!post2) return res.status(404).json({ message: 'post is not found', success: false });

        if (post2.author.toString() != authorid) return res.status(403).json({ message: 'Unauthorized' });

        await post.findByIdAndDelete(postid);

        let user1 = await usermodel.findById(authorid);
        user1.posts = user1.posts.filter(id => id.toString() != postid);
        await user1.save();

        await Comment.deleteMany({ post: postid });

        return res.status(200).json({
            success: true,
            message: 'Post deleted'
        })

    } catch (error) {
        console.log(error);
    }
}

export const bookmarkpost = async (req, res) => {
    try {
        const postid = req.params.id;
        const authorid = req.id;

        const post1 = await post.findById(postid);
        if (!post1) return res.status(404).json({ message: 'post is not found', success: false });

        const user1 = await usermodel.findById(authorid);
        if (user1.bookmarks.includes(post1._id)) {
            await user1.updateOne({ $pull: { bookmarks: post1._id } });
            await user1.save();
            return res.status(200).json({ type: 'unsaved', message: 'Post removed from bookmark', success: true });
        } else {
            await user1.updateOne({ $addToSet: { bookmarks: post1._id } });
            await user1.save();
            return res.status(200).json({ type: 'saved', message: 'Post Saved from bookmark', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}