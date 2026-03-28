const path = require('path')
const hbs = require('handlebars')
const fs = require('fs')
const minify = require('html-minifier').minify
const { JSDOM } = require('jsdom')
const { kFormatter, renderGithub } = require('../src/utils')

const ROOT_DIR = path.resolve(__dirname, '..')
const ASSET_DIR = path.resolve(`${ROOT_DIR}/assets/`)
const TEMPLATE_PATH = path.resolve(ASSET_DIR, 'index.html')
const THEME_DIR = path.join(ASSET_DIR, 'themes')
const BACKGROUND_IMAGE = 'https://cdn.jsdelivr.net/gh/WangNingkai/BingImageApi@latest/images/latest.png'
const AVAILABLE_THEMES = new Set(
  fs
    .readdirSync(THEME_DIR)
    .filter((fileName) => fileName.endsWith('.css'))
    .map((fileName) => fileName.replace(/\.css$/, '')),
)

let cachedTemplateHtml = null
const themeTemplateCache = new Map()

const getTemplateHtml = () => {
  if (!cachedTemplateHtml) {
    cachedTemplateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8')
  }
  return cachedTemplateHtml
}

const resolveTheme = (theme) => {
  return AVAILABLE_THEMES.has(theme) ? theme : 'dark'
}

const getThemeTemplate = (theme) => {
  if (themeTemplateCache.has(theme)) {
    return themeTemplateCache.get(theme)
  }

  const themeSource = fs.readFileSync(path.join(THEME_DIR, `${theme}.css`), 'utf-8')
  const compiledTemplate = hbs.compile(themeSource)
  themeTemplateCache.set(theme, compiledTemplate)
  return compiledTemplate
}

const renderProjectCard = (repo) => {
  return `
        <a href="${repo.url}" target="_blank">
        <section>
            <div class="section_title">${repo.name}</div>
            <div class="about_section">
            <span style="display:${repo.shortDescriptionHTML === undefined ? 'none' : 'block'};">${repo.shortDescriptionHTML || ''}</span>
            </div>
            <div class="bottom_section">
                <span style="display:${repo.primaryLanguage == null ? 'none' : 'inline-block'};"><i class="fas fa-code"></i>&nbsp; ${
                  repo.primaryLanguage == null ? '' : repo.primaryLanguage.name
                }</span>
                <span><i class="fas fa-star"></i>&nbsp; ${kFormatter(repo.stargazers.totalCount)}</span>
                <span><i class="fas fa-code-branch"></i>&nbsp; ${kFormatter(repo.forkCount)}</span>
            </div>
        </section>
        </a>`
}

const renderInfo = async (info, args = {}) => {
  const { theme, includeFork } = args
  const dom = new JSDOM(getTemplateHtml())
  const document = dom.window.document
  let stars = 0
  try {
    const activeTheme = resolveTheme(theme)
    const user = info
    const repos = user.repositories.nodes
    let workSectionHtml = ''
    let forksSectionHtml = ''

    for (let i = 0; i < repos.length; i++) {
      stars += repos[i].stargazers.totalCount
      const isFork = repos[i].isFork
      if (isFork === false) {
        workSectionHtml += renderProjectCard(repos[i])
      } else if (isFork === true && includeFork === true) {
        forksSectionHtml += renderProjectCard(repos[i])
      } else {
        continue
      }
    }

    document.getElementById('work_section').innerHTML = workSectionHtml
    if (includeFork === true && forksSectionHtml) {
      document.getElementById('forks').style.display = 'block'
      document.getElementById('forks_section').innerHTML = forksSectionHtml
    }

    stars = kFormatter(stars)
    document.title = user.login
    const themeTemplate = getThemeTemplate(activeTheme)
    const styles = themeTemplate({
      background: BACKGROUND_IMAGE,
    })

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = styles

    const icon = document.createElement('link')
    icon.setAttribute('rel', 'icon')
    icon.setAttribute('href', user.avatarUrl)
    icon.setAttribute('type', 'image/png')

    document.getElementsByTagName('head')[0].appendChild(icon)
    document.getElementsByTagName('head')[0].appendChild(style)
    document.getElementById('github').innerHTML = renderGithub(user.url, activeTheme)
    document.getElementById('profile_img').style.background = `url('${user.avatarUrl}') center center`
    document.getElementById('username').innerHTML = `<span style="display:${
      user.name == null || !user.name ? 'none' : 'block'
    };">${user.name || ''}</span><a href="${user.url}">@${user.login}</a>`
    document.getElementById('userbio').innerHTML = user.bioHTML
    document.getElementById('userbio').style.display = user.bioHTML == null || !user.bioHTML ? 'none' : 'block'
    document.getElementById('about').innerHTML = `
              <span style="display:${
                user.followers == null || !user.followers ? 'none' : 'block'
              };"><i class="fas fa-users"></i> &nbsp; ${kFormatter(user.followers.totalCount)} followers · ${kFormatter(
                user.following.totalCount,
              )} following</span>
              <span style="display:block"><i class="fas fa-star"></i> &nbsp; ${stars} stars</span>
              <span style="display:block"><i class="fas fa-history"></i> &nbsp; ${kFormatter(
                user.totalCommits,
              )} commits</span>
              <span style="display:${
                user.company == null || !user.company ? 'none' : 'block'
              };"><i class="fas fa-building"></i> &nbsp; ${user.company || ''}</span>
              <span style="display:${
                user.email == null || !user.email ? 'none' : 'block'
              };"><i class="fas fa-envelope"></i> &nbsp; ${user.email || ''}</span>
              <span style="display:${
                user.websiteUrl == null || !user.websiteUrl ? 'none' : 'block'
              };"><i class="fas fa-link"></i> &nbsp; <a href="${user.websiteUrl || ''}">${user.websiteUrl || ''}</a></span>
              <span style="display:${
                user.location == null || !user.location ? 'none' : 'block'
              };"><i class="fas fa-map-marker-alt"></i> &nbsp; ${user.location || ''}</span>
              <span style="display:${
                user.isHireable == false || !user.isHireable ? 'none' : 'block'
              };"><i class="fas fa-user-tie"></i> &nbsp; Available for hire</span>
              `
    const content = '<!DOCTYPE html>' + dom.window.document.documentElement.outerHTML
    return minify(content, { removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true })
  } catch (error) {
    throw new Error(error.message || 'Failed to render portfolio page')
  } finally {
    dom.window.close()
  }
}
module.exports = renderInfo
