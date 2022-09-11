import express from "express";
import cors from 'cors';
import 'dotenv/config';
import router from "./router";

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', router);
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is up and running ${port}`)
})