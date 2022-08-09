import express from "express";
import 'dotenv/config';
import router from "./router";

const app = express();
app.use(express.json());

app.use('/api/v1/users', router);
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is up and running ${port}`)
})