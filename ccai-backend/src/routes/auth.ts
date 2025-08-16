import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const demoUser = {
  id: 1,
  email: 'demo@ccai.com',
  password: '$2a$10$rYvKaWFbMTYA4gXu3qKzPOvQ0zMKFV4XxA7RzQ8pGYcVvYOYl7XYO',
  name: 'Demo User',
  role: 'admin'
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== demoUser.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, demoUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: demoUser.id, email: demoUser.email },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/demo-credentials', (req, res) => {
  res.json({
    email: 'demo@ccai.com',
    password: 'demo123'
  });
});

export default router;