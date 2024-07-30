import express from 'express';
import {signupUser,loginUser, getAllUsers, deleteUserById} from "../controllers/user.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.delete('/:id', deleteUserById);
router.post('/signup', signupUser);

export default router;