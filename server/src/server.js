import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/user.js';
import morgan from 'morgan';
dotenv.config();

const PORT = process.env.PORT || 4005;
const app = express();
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGOOSE_URI)
.then(() => console.log("mongoose connected"))
.catch((error) => console.log(error))