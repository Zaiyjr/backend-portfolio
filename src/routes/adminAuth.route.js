import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

function getCookie(req, name) {
  const header = String(req.headers.cookie || '');
  if (!header) return '';

  const parts = header.split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('=') || '');
  }
  return '';
}

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

router.post('/login', async (req, res) => {
  const secret = process.env.ADMIN_JWT_SECRET || '';
  const username = process.env.ADMIN_USERNAME || '';
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';

  if (!secret || !username || !passwordHash) {
    return res.status(500).json({ message: 'Admin auth is not configured on the server' });
  }

  if (!passwordHash.startsWith('$2a$') && !passwordHash.startsWith('$2b$') && !passwordHash.startsWith('$2y$')) {
    return res.status(500).json({ message: 'ADMIN_PASSWORD_HASH must be a bcrypt hash' });
  }

  const providedUsername = String(req.body?.username || '').trim();
  const providedPassword = String(req.body?.password || '');

  if (!providedUsername || !providedPassword) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  if (providedUsername !== username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(providedPassword, passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ role: 'admin', username }, secret, { expiresIn: '7d' });
  res.cookie('admin_token', token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.status(200).json({ message: 'ok' });
});

router.post('/logout', (req, res) => {
  res.cookie('admin_token', '', { ...cookieOptions, maxAge: 0 });
  return res.status(200).json({ message: 'ok' });
});

router.get('/me', (req, res) => {
  const secret = process.env.ADMIN_JWT_SECRET || '';
  if (!secret) return res.status(500).json({ message: 'Admin auth is not configured on the server' });

  const token = getCookie(req, 'admin_token');
  if (!token) return res.status(200).json({ authenticated: false });

  try {
    const payload = jwt.verify(token, secret);
    if (!payload || payload.role !== 'admin') return res.status(200).json({ authenticated: false });
    return res.status(200).json({ authenticated: true, username: payload.username });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
});

export default router;
