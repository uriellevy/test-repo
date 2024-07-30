import User from '../models/user.js';
import jwt from "jsonwebtoken";

const createToken = (id,isAdmin, userName) => {
    return jwt.sign({_id:id, isAdmin, userName}, process.env.SECRET,{expiresIn: "3d"});
}

export const loginUser = async (req,res) => {
    const {userName, password} = req.body;

    try {
       const user = await User.login(userName,password);
       const token = createToken(user._id, user.isAdmin, user.userName);

        res.status(200).json({message:"user logged in successfully",token})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const signupUser = async (req,res) => {
    const {userName, password} = req.body;

    try {
        const user = await User.signup(userName, password);

        res.status(200).json({message:"user created successfully",user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({message: "users fetched successfully", data:users});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteUserById = async (req,res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) return res.status(404).json({message:"user not found"});
        
        const users = await User.find();
        res.status(200).json({message: "users deleted successfully", data:{deletedUser,users}});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}