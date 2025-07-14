import express from 'express';
import type{ Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import NodeCache from 'node-cache';

const prisma =  new PrismaClient()
const cache = new NodeCache({ stdTTL: 60 })

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

  /*** 
  * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */

  // Read All
  router.get('/all-users', async (req: Request, res:Response) => {

      const cached = cache.get('all-users');
  if (cached) return res.json(cached);

    const users = await prisma.user.findMany();
    cache.set('all-users',users);
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
    const { name,age } = req.body;
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
