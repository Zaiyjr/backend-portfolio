export default function requireAdminKey(req, res, next) {
  const configuredKey = process.env.ADMIN_KEY || '';
  if (!configuredKey) {
    return res.status(500).json({ message: 'ADMIN_KEY is not configured on the server' });
  }

  const providedKey = String(req.headers['x-admin-key'] || '');
  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
}

