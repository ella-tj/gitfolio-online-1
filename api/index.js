const fetchInfo = require('../src/fetch')
const renderInfo = require('../src/render')
const { renderError, clampValue, parseBoolean, CONSTANTS, logger } = require('../src/utils')
const githubUsernameRegex = require('github-username-regex')

module.exports = async (req, res) => {
  const { username, theme, includeFork, cache_seconds, repoNum } = req.query

  // Validate username format early
  if (!username || !githubUsernameRegex.test(username)) {
    res.status(400)
    return res.send(renderError('Invalid username format'))
  }

  const parsedRepoNum = clampValue(parseInt(repoNum || 30, 10) || 30, 1, 100)

  let info
  try {
    info = await fetchInfo(username, parsedRepoNum)
  } catch (err) {
    res.status(err.message === 'Invalid username' ? 400 : 502)
    return res.send(renderError(err.message))
  }

  const cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY,
  )

  const staleWhileRevalidateSeconds = Math.min(cacheSeconds, CONSTANTS.THIRTY_MINUTES)
  res.setHeader(
    'Cache-Control',
    `public, max-age=0, s-maxage=${cacheSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`,
  )

  try {
    const value = await renderInfo(info, { theme: theme || 'auto', includeFork: parseBoolean(includeFork) })
    res.send(value)
  } catch (err) {
    logger.error('Render failed:', err.message)
    res.status(500)
    res.send(renderError(err.message))
  }
}
