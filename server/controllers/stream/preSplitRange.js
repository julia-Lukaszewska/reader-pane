import { getExistingRange } from '../../utils/getExistingRange.js'
import { fullFile } from './fullFile.js'

export const preSplitRange = async (req, res, next) => {
  const start = parseInt(req.query.start, 10)
  const end = parseInt(req.query.end, 10)
  if (Number.isNaN(start) || Number.isNaN(end) || start < 1 || end < start) {
    return res.status(400).json({ error: 'Invalid start or end parameters' })
  }
  try {
    const pre = await getExistingRange(req.params.filename, start, end)
    if (!pre) return next()
    console.log(`[RANGE CACHE] ${pre.filename}`)
    req.params.filename = pre.filename
    await fullFile(req, res)
  } catch (err) {
    next(err)
  }
}

