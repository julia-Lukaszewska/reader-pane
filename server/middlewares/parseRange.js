/**
 * @file middlewares/parseRange.js
 * @description
 * Parses the Range header into req.range = { start, end }.
 */
export default function parseRange(req, res, next) {
  const range = req.headers.range;
    console.log('[parseRange] raw header:', range);
  if (!range) return next();

  const m = /^bytes=(\d+)-(\d*)$/.exec(range);
  if (!m) {
     console.warn('[parseRange] Invalid Range header format');
    return res.status(400).json({ message: 'Invalid Range header' });
  }

  const start = parseInt(m[1], 10);
  const end   = m[2] ? parseInt(m[2], 10) : undefined;
  req.range = { start, end };
    console.log('[parseRange] Parsed range:', req.range);
  next();
}
