import express from "express";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT || 3000;


app.listen(()=> console.log(`Server is running on ${port}`));