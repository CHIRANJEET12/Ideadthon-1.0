import express from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import projectPostroute from "./routes/projectPostroute.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log(`Connected to DB`);
})
.catch(err => console.log(err));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/post',projectPostroute);

app.listen(port,()=> console.log(`Server is running on ${port}`));