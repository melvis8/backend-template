import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma =  new PrismaClient()


export default function () {
  const router = express.Router();

  // Create
  router.post('/', async (req: Request, res:Response) => {
    const { name,age } = req.body;
    try {
      const user = await prisma.user.create({ data: { name ,age} });
      res.status(201).json(user);
    } catch (err:any) {
      res.status(500).json({ error: err.message });
      console.error(err)
    }
  });

  // Read All
  router.get('/', async (req: Request, res:Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

  // Read One
  router.get('/:id', async (req: Request, res:Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!user) return res.status(404).json({ error: 'Not found' });
      res.json(user);
    } catch (err:any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Update
  router.put('/:id', async (req: Request, res:Response) => {
    const { name } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { name,age },
      });
      res.json(user);
    } catch (err:any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete
  router.delete('/:id', async (req: Request, res:Response) => {
    try {
      await prisma.user.delete({ where: { id: req.params.id } });
      res.json({ message: 'user deleted' });
    } catch (err:any) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
