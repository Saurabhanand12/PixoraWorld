import bcrypt from 'bcrypt';
import usermodel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import cloudinary from '../utils/cloudinary.js';
import getdatauri from '../utils/datauri.js'
import { post } from '../models/post.model.js';


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Something is missing , please check",
                success: false,
            });
        }

        const user1 = await usermodel.findOne({ username,email });
        if (user1) {
            return res.status(400).json({
                message: "Email ID is Already Exists",
                success: false,
            });
        }

        const hash = await bcrypt.hash(password, 10);
        await usermodel.create({
            username,
            email,
            password: hash,
        });
        return res.status(201).json({
            message: "Account Created Successfully..",
            success: true,
        });


    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password missing",
        success: false,
      });
    }

    const userdoc = await usermodel.findOne({ email });
    if (!userdoc) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const matchpassword = await bcrypt.compare(password, userdoc.password);
    if (!matchpassword) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const token = jwt.sign(
      { userid: userdoc._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const user = {
      _id: userdoc._id,
      username: userdoc.username,
      email: userdoc.email,
      bio: userdoc.bio,
      profilepic: userdoc.profilepic,
      followers: userdoc.followers,
      following: userdoc.following,
      posts: userdoc.posts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",   // 🔥 IMPORTANT
        secure: false,     // true only in production
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: `Welcome Back ${user.username}`,
        success: true,
        user,
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
    try {
        return res.cookie("token", " ", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const getProfile = async (req, res) => {
    try {
        const userid = req.params.id;
        let user = await usermodel.findById(userid).populate({path:'posts',createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const editProfile = async (req, res) => {
    try {
        const userid = req.id;
        const { bio, gender, username } = req.body;
        const profilepic = req.file;
        let cloudresponse;

        if (profilepic) {
            const fileuri = getdatauri(profilepic);
            cloudresponse = await cloudinary.uploader.upload(fileuri);
        }

        const user = await usermodel.findById(userid).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User is not Found",
                success: false
            });
        };

        if (bio) user.bio = bio;
        if (username) user.username = username;
        if (gender) user.gender = gender;
        if (profilepic) user.profilepic = cloudresponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: "Profile is updated",
            success: true,
            user
        });


    } catch (error) {
        console.log(error);
    }
}

export const getsuggesteduser = async (req, res) => {
    try {
        const suggesteduser = await usermodel.find({ id: { $ne: req.id } }).select("-password");
        if (!suggesteduser) {
            return res.status(400).json({
                message: "Currently do not have any user",
            });
        }
        return res.status(200).json({
            success: true,
            users: suggesteduser,
        })
    } catch (error) {
        console.log(error);
    }
}

export const followOrunfollow = async (req, res) => {
    try {
        const userId = req.id;           // logged in user
        const targetId = req.params.id;  // user to follow or unfollow

        if (userId === targetId) {
            return res.status(400).json({
                message: "You cannot follow / unfollow yourself",
                success: false,
            });
        }

        const user = await usermodel.findById(userId);
        const targetUser = await usermodel.findById(targetId);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        const isFollowing = user.following.includes(targetId);

        if (isFollowing) {
            // Unfollow
            await Promise.all([
                user.updateOne({ $pull: { following: targetId } }),
                targetUser.updateOne({ $pull: { followers: userId } }),
            ]);

            return res.status(200).json({
                type:'unfollow',
                message: "Unfollowed successfully",
                success: true,
            });
        } else {
            // Follow
            await Promise.all([
                user.updateOne({ $push: { following: targetId } }),
                targetUser.updateOne({ $push: { followers: userId } }),
            ]);

            return res.status(200).json({
                type:'follow',
                message: "Followed successfully",
                success: true,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
