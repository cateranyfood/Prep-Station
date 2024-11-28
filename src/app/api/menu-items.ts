import { addMenuItemToDatabaseAdmin } from '../../../services/database';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const newItem = await addMenuItemToDatabaseAdmin(req.body);
      return res.status(201).json(newItem); // Return the created item
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add menu item' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}