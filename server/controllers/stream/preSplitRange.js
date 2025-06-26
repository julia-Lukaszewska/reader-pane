import Book from '../../models/Book.js';
import { getExistingRange } from '../../utils/getExistingRange.js';
import { fullFile } from './fullFile.js';

export const preSplitRange = async (req, res, next) => {
  // 1) Fetch the last-used range from the Book document as defaults
  const book = await Book.findOne(
    { 'file.filename': req.params.filename },
    'stats.currentRange'
  );
  const [defStart = 1, defEnd = defStart] = book?.stats?.currentRange || [];

  // 2) Prefer query params, fall back to the stored range
  const start = parseInt(req.query.start ?? defStart, 10);
  const end   = parseInt(req.query.end   ?? defEnd,   10);

  // 3) Validate parameters
  if (Number.isNaN(start) || Number.isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({ error: 'Invalid start or end parameters' });
  }

  try {
    // 4) If a pre-generated range file exists, serve it
    const pre = await getExistingRange(req.params.filename, start, end);
    if (pre) {
      console.log(`[RANGE CACHE] ${pre.filename}`);
      req.params.filename = pre.filename;
      return fullFile(req, res);
    }
    // 5) Otherwise, continue to dynamic generation
    next();
  } catch (err) {
    next(err);
  }
};
