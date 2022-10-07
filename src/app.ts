import express, {Application} from "express";
import cors from 'cors';
import 'dotenv/config';

import registerRoutes from "./router";

const app: Application = express();
app.use(express.json());
app.use(cors());

registerRoutes(app)


export default app;