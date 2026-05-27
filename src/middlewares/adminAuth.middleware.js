import jwt from 'jsonwebtoken';

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

export default function requireAdminAuth(req, res, next) {
  const secret = process.env.ADMIN_JWT_SECRET || '';
  if (!secret) {
    return res.status(500).json({ message: 'ADMIN_JWT_SECRET is not configured on the server' });
  }

  const token =
    getCookie(req, 'admin_token') ||
    String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, secret);
    if (!payload || payload.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' });
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
