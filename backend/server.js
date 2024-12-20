import express from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"

env.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log(`Connected to DB`);
})
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);

app.listen(()=> console.log(`Server is running on ${port}`));