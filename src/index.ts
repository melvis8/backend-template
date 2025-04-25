import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoute from './routes/user.route';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/users', userRoute());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
