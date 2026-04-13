const path = require('path')
const hbs = require('handlebars')
const fs = require('fs')
const { kFormatter, renderGithub, escapeHtml, sanitizeUrl, sanitizeHtml } = require('../src/utils')

// 语言颜色映射 (GitHub 官方配色)
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Less: '#1d365d',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  React: '#61dafb',
  Markdown: '#083fa1',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  YAML: '#cb171e',
  JSON: '#292929',
  SQL: '#e38c00',
  Lua: '#000080',
  Perl: '#0298c3',
  R: '#198ce7',
  MATLAB: '#e16737',
  Julia: '#a270ba',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Erlang: '#B83998',
  Clojure: '#db5855',
  'F#': '#b845fc',
  Nim: '#ffc200',
  Crystal: '#000100',
  OCaml: '#3be133',
  ObjectiveC: '#438eff',
  Assembly: '#6E4C13',
  Fortran: '#4d41b1',
  COBOL: '#a50000',
  Apex: '#1797c0',
  VisualBasic: '#945db7',
  PowerShell: '#012456',
  Groovy: '#4293f0',
  CoffeeScript: '#244776',
  Elm: '#60B5CC',
  PureScript: '#1D2224',
  Zig: '#ec915c',
  V: '#5d87bd',
  Solidity: '#AA6746',
  ActionScript: '#882B0F',
  Ada: '#02f88c',
  Agda: '#315665',
  Apollo: '#414743',
  Arc: '#aa2afe',
  AspectJ: '#a957b0',
  AutoHotkey: '#6594b9',
  AutoIt: '#1C3552',
  Benny: '#ff3e00',
  Bluespec: '#2c3e50',
  Brightscript: '#ff3e00',
  Bro: '#cc3c3c',
  CMake: '#da282a',
  CartoCSS: '#ff3e00',
  Chapel: '#8dc63f',
  Clean: '#3F85AF',
  Click: '#E4E6F3',
  ColdFusion: '#ed2cd6',
  CommonLisp: '#3fb68b',
  ComponentPascal: '#b0ce4e',
  Cool: '#0b5077',
  Coq: '#d0b68c',
  Cython: '#fedf5b',
  D: '#ba595e',
  DM: '#447265',
  Diff: '#ff3e00',
  Dylan: '#00b3a0',
  E: '#ccce35',
  ECL: '#8a1267',
  Egison: '#003300',
  EmacsLisp: '#c065db',
  Emoji: '#ffe3d7',
  Equation: '#ffe3d7',
  Fstar: '#572e42',
  Factor: '#636747',
  Fancy: '#7b9db4',
  Fang: '#ff3e00',
  Fantom: '#14253c',
  Fish: '#414743',
  Flux: '#88ccff',
  Forth: '#341708',
  Frege: '#00cafe',
  GCode: '#D08B2B',
  GameMakerLanguage: '#71c437',
  Gherkin: '#ff3e00',
  Glyph: '#c1ac7f',
  Gnuplot: '#f0a9f0',
  Gram: '#c1ac7f',
  Graphql: '#e10098',
  Graphviz: '#2596be',
  GroovyServerPages: '#4293f0',
  Hack: '#878787',
  Harbour: '#ff3e00',
  Haxe: '#df7900',
  HiveQL: '#ff3e00',
  HolyC: '#ffefaf',
  Hy: '#7790B2',
  IDL: '#a3522f',
  IgorPro: '#0000cc',
  Inform7: '#ff3e00',
  Io: '#a9188d',
  Ioke: '#078193',
  Isabelle: '#FEFE00',
  J: '#9EEDFF',
  Janet: '#ff3e00',
  Jison: '#56b3cb',
  Jolie: '#843179',
  jq: '#c7244b',
  Jsonnet: '#0064bd',
  Jsx: '#ff3e00',
  JupyterNotebook: '#F37626',
  Krl: '#28430f',
  LabVIEW: '#e5e6e3',
  Lark: '#298298',
  Lasso: '#999999',
  Lex: '#dbca28',
  LilyPond: '#9dc737',
  LindenScriptingLanguage: '#ff3e00',
  Logo: '#ff3e00',
  LolCode: '#ff3e00',
  LookML: '#652B81',
  LSL: '#3d9970',
  M4: '#ff3e00',
  M4Sugar: '#ff3e00',
  Macaulay2: '#d1eee8',
  Makefile: '#6cc644',
  Max: '#c4a79c',
  Maxscript: '#00a6a6',
  Mercury: '#ff2b2b',
  Meson: '#2d3cb0',
  Metal: '#8f5e24',
  ML: '#ff3e00',
  Modelica: '#de9d2d',
  Modula2: '#10253f',
  Modula3: '#223388',
  Morpho: '#ff3e00',
  MQL4: '#62a8d6',
  MQL5: '#62a8d6',
  MTML: '#b7e1f4',
  MUF: '#ff3e00',
  mupad: '#2c3e50',
  Mustache: '#ff3e00',
  Myghty: '#ff3e00',
  NASL: '#ff3e00',
  NCL: '#28430f',
  Nearley: '#990000',
  Nemerle: '#32918f',
  NetLinx: '#0aad0a',
  NetLinxERB: '#ff3e00',
  NetLogo: '#ff6600',
  NewLisp: '#87AEDB',
  Nextflow: '#3a9a4b',
  Nginx: '#009639',
  Ninja: '#ff3e00',
  Nit: '#009917',
  Nix: '#7e7eff',
  Nu: '#c9df40',
  ObjectiveJ: '#ff0c5a',
  Odin: '#00aff4',
  OOC: '#ff3e00',
  Opal: '#f7ede0',
  OpenQASM: '#ff3e00',
  Org: '#77aa99',
  Oxygene: '#cdd0e3',
  Oz: '#fab738',
  Pan: '#cc0000',
  Papyrus: '#6600cc',
  Parrot: '#ff3e00',
  Pascal: '#E3F171',
  Pawn: '#db5b20',
  Pep8: '#C76F5B',
  Perl6: '#0000fb',
  Pic: '#ff3e00',
  Pike: '#005390',
  PigLatin: '#ffcd00',
  PlantUML: '#ff3e00',
  PogoScript: '#ff3e00',
  Pony: '#ff3e00',
  PostScript: '#da291c',
  PowerBuilder: '#8f0f0f',
  Processing: '#0096D8',
  Prolog: '#7428c7',
  PropellerSpin: '#ff3e00',
  Puppet: '#ff3e00',
  PureBasic: '#9a6700',
  PureScript: '#1D2224',
  Pythonconsole: '#3572A5',
  Q: '#0040cd',
  QASM: '#ff3e00',
  QML: '#44a51c',
  Quik: '#ff3e00',
  Racket: '#3ccc5c',
  Raml: '#77d9fb',
  Rascal: '#fffaa0',
  Rebol: '#358a5b',
  Red: '#ba4003',
  RenPy: '#ff7f7f',
  Ring: '#2d54cb',
  Riot: '#ff3e00',
  RobotFramework: '#00c0b8',
  Rouge: '#cc0088',
  Rpg: '#ff3e00',
  RpmSpec: '#ff3e00',
  Runoff: '#ff3e00',
  Rusthon: '#ff3e00',
  Sage: '#ff3e00',
  Sass: '#a65457',
  Scaml: '#bdffe1',
  Scheme: '#1e4aec',
  Scilab: '#fa0900',
  Self: '#ff3e00',
  Shen: '#ff3e00',
  Slash: '#007eff',
  Smali: '#ff3e00',
  Smalltalk: '#596706',
  Smarty: '#ff3e00',
  SMT: '#ff3e00',
  Snobol: '#ff3e00',
  Snowball: '#ff3e00',
  Solidity: '#AA6746',
  SourcePawn: '#5c7611',
  Squirrel: '#800000',
  Stan: '#b2011d',
  StandardML: '#dc566d',
  Stata: '#ff3e00',
  SuperCollider: '#3636ff',
  Sverilog: '#ff3e00',
  SwiftforTensorflow: '#ff3e00',
  SystemVerilog: '#DA2D28',
  Tcl: '#e4cc98',
  TeX: '#3D6117',
  Terra: '#00004c',
  Textile: '#ffe7ac',
  Thrift: '#ff3e00',
  TOML: '#9c4221',
  TXL: '#ff3e00',
  TypeScript: '#3178c6',
  TypeScriptTypings: '#3178c6',
  Unity3DAsset: '#ab69a1',
  UnrealScript: '#a54c4d',
  UrWeb: '#ff3e00',
  VCL: '#148aa8',
  VBA: '#867db1',
  VBScript: '#15d8c3',
  Velocity: '#507682',
  Verilog: '#b2b7f8',
  VHDL: '#adb5cb',
  VimScript: '#199f4b',
  VisualBasicNET: '#945db7',
  VisualFoxPro: '#ff3e00',
  Volt: '#1F1F1F',
  Vue: '#41b883',
  WDTE: '#ff3e00',
  WebAssembly: '#04133b',
  WebIDL: '#ff3e00',
  Wollok: '#a23738',
  WorldBasic: '#ff3e00',
  X10: '#4B6BEF',
  xBase: '#403a40',
  XC: '#99DA07',
  Xon: '#ff3e00',
  XQuery: '#ff3e00',
  XSLT: '#EB8CEB',
  Xtend: '#24255d',
  Yacc: '#ff3e00',
  YARA: '#ff0000',
  YASnippet: '#32AB90',
  Zephir: '#118f9e',
  Zig: '#ec915c',
  ZIL: '#ff3e00',
}

const getLanguageColor = (languageName) => {
  return LANGUAGE_COLORS[languageName] || '#8b8b8b'
}

const ROOT_DIR = path.resolve(__dirname, '..')
const ASSET_DIR = path.resolve(`${ROOT_DIR}/assets/`)
const LAYOUT_CSS_PATH = path.resolve(ASSET_DIR, 'index.css')
const THEME_DIR = path.join(ASSET_DIR, 'themes')
const BACKGROUND_IMAGE = 'https://cdn.jsdelivr.net/gh/WangNingkai/BingImageApi@latest/images/latest.png'
const AVAILABLE_THEMES = new Set(
  fs
    .readdirSync(THEME_DIR)
    .filter((fileName) => fileName.endsWith('.css'))
    .map((fileName) => fileName.replace(/\.css$/, '')),
)

// 启动时预加载静态资源（只读一次）
let cachedLayoutCss = null
const themeTemplateCache = new Map()

const getLayoutCss = () => {
  if (!cachedLayoutCss) {
    cachedLayoutCss = fs.readFileSync(LAYOUT_CSS_PATH, 'utf-8')
  }
  return cachedLayoutCss
}

const resolveTheme = (theme) => {
  return AVAILABLE_THEMES.has(theme) ? theme : 'auto'
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
  const languageColor = repo.primaryLanguage ? getLanguageColor(repo.primaryLanguage.name) : null
  return `<a href="${repo.url}" target="_blank"><section><div class="section_title">${escapeHtml(repo.name)}</div><div class="about_section"><span style="display:${repo.shortDescriptionHTML === undefined ? 'none' : 'block'};">${sanitizeHtml(repo.shortDescriptionHTML) || ''}</span></div><div class="bottom_section"><span class="lang-tag" style="display:${repo.primaryLanguage == null ? 'none' : 'inline-flex'};"><span class="lang-dot" style="background:${languageColor}"></span>${repo.primaryLanguage == null ? '' : escapeHtml(repo.primaryLanguage.name)}</span><span><i class="fas fa-star"></i>&nbsp;${kFormatter(repo.stargazers.totalCount)}</span><span><i class="fas fa-code-branch"></i>&nbsp;${kFormatter(repo.forkCount)}</span></div></section></a>`
}

const renderInfo = async (info, args = {}) => {
  const { theme, includeFork } = args
  const activeTheme = resolveTheme(theme)
  const user = info
  const repos = user.repositories.nodes

  let workSectionHtml = ''
  let forksSectionHtml = ''
  let totalStars = 0

  for (let i = 0; i < repos.length; i++) {
    totalStars += repos[i].stargazers.totalCount
    if (repos[i].isFork === false) {
      workSectionHtml += renderProjectCard(repos[i])
    } else if (repos[i].isFork === true && includeFork === true) {
      forksSectionHtml += renderProjectCard(repos[i])
    }
  }

  const stars = kFormatter(totalStars)
  const title = `${user.name || user.login} — GitHub Portfolio`
  const bioText = user.bioHTML ? user.bioHTML.replace(/<[^>]*>/g, '').slice(0, 160) : `${user.login}'s GitHub portfolio`

  const themeCss = getThemeTemplate(activeTheme)({ background: BACKGROUND_IMAGE })
  const layoutCss = getLayoutCss()

  const forksDisplay = includeFork === true && forksSectionHtml ? 'block' : 'none'

  const nameDisplay = user.name == null || !user.name ? 'none' : 'block'
  const usernameHtml = `<span style="display:${nameDisplay};">${escapeHtml(user.name || '')}</span><a href="${escapeHtml(user.url)}">@${escapeHtml(user.login)}</a>`
  const userbioDisplay = user.bioHTML == null || !user.bioHTML ? 'none' : 'block'
  const userbioHtml = `<div style="display:${userbioDisplay};">${user.bioHTML}</div>`
  const aboutHtml = `<span style="display:${user.followers == null || !user.followers ? 'none' : 'block'};"><i class="fas fa-users"></i> &nbsp;${kFormatter(user.followers.totalCount)} followers · ${kFormatter(user.following.totalCount)} following</span>
<span style="display:block"><i class="fas fa-star"></i> &nbsp;${stars} stars</span>
<span style="display:block"><i class="fas fa-history"></i> &nbsp;${kFormatter(user.totalCommits)} commits</span>
<span style="display:${user.company == null || !user.company ? 'none' : 'block'};"><i class="fas fa-building"></i> &nbsp;${escapeHtml(user.company || '')}</span>
<span style="display:${user.email == null || !user.email ? 'none' : 'block'};"><i class="fas fa-envelope"></i> &nbsp;${escapeHtml(user.email || '')}</span>
<span style="display:${user.websiteUrl == null || !user.websiteUrl ? 'none' : 'block'};"><i class="fas fa-link"></i> &nbsp;<a href="${escapeHtml(sanitizeUrl(user.websiteUrl))}">${escapeHtml(user.websiteUrl || '')}</a></span>
<span style="display:${user.location == null || !user.location ? 'none' : 'block'};"><i class="fas fa-map-marker-alt"></i> &nbsp;${escapeHtml(user.location || '')}</span>
<span style="display:${user.isHireable == false || !user.isHireable ? 'none' : 'block'};"><i class="fas fa-user-tie"></i> &nbsp;Available for hire</span>`

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(bioText)}"><meta property="og:type" content="profile"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(user.login)}'s GitHub portfolio"><meta property="og:image" content="${escapeHtml(user.avatarUrl)}"><meta property="twitter:card" content="summary"><meta property="twitter:title" content="${escapeHtml(title)}"><meta property="twitter:description" content="${escapeHtml(user.login)}'s GitHub portfolio"><meta property="twitter:image" content="${escapeHtml(user.avatarUrl)}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://cdn.jsdelivr.net"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&family=Questrial&display=swap"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css"><link rel="icon" href="${user.avatarUrl}" type="image/png"><style>${themeCss}</style><style>${layoutCss}</style></head><body><div id="loading" role="status" aria-live="polite" aria-label="Loading portfolio content"><div id="skeleton" aria-hidden="true"><div class="skeleton-profile"><div class="skeleton-avatar"></div><div class="skeleton-name"></div><div class="skeleton-bio"></div></div><div class="skeleton-content"><h1 class="skeleton-title"></h1><div class="skeleton-grid"><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div></div></div></div></div>${renderGithub(user.url, activeTheme)}<div id="profile" role="region" aria-label="User profile"><div id="profile_img" style="background:url('${user.avatarUrl}') center center"></div><div id="username">${usernameHtml}</div><div id="userbio">${userbioHtml}</div><div id="about">${aboutHtml}</div></div><div id="display" role="main"><div id="work" role="region" aria-label="Work projects"><h1>Work.</h1><div class="projects" id="work_section" aria-live="polite">${workSectionHtml}</div></div><div id="forks" style="display:${forksDisplay}" role="region" aria-label="Forked projects"><h1>Forks.</h1><div class="projects" id="forks_section">${forksSectionHtml}</div></div><div id="footer"><a href="https://github.com/wangningkai" target="_blank">made on earth by a human</a></div></div><script type="text/javascript">setTimeout(function(){document.getElementById('loading').classList.add('animated'),document.getElementById('loading').classList.add('fadeOut'),setTimeout(function(){document.getElementById('loading').classList.remove('animated'),document.getElementById('loading').classList.remove('fadeOut'),document.getElementById('loading').style.display='none'},600)},600)</script></body></html>`
}

module.exports = renderInfo
