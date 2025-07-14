import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoute from './routes/user.route';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import { setupSwagger } from './swagger';

dotenv.config();


const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:' Too many requests, please try again later.',
});
const prisma = new PrismaClient();

setupSwagger(app);

app.use(express.json());
app.use('/users', userRoute());
app.use(limiter);
app.use(compression());
app.use(morgan('combined'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`Documentation  : http://localhost:${PORT}/api-docs`);
