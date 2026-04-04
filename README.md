![](https://cdn.jsdelivr.net/gh/wangningkai/wangningkai/assets/20200726173312.png)

<h1 align="center">Gitfolio Online</h1>

<p align="center">
  <strong>A personal portfolio website for every GitHub user</strong>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#features">Features</a> •
  <a href="#customization">Customization</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <a href="https://gitfolio-online.vercel.app/user/wangningkai">
    <img src="https://cdn.jsdelivr.net/gh/wangningkai/wangningkai/assets/gitfolio-demo.gif" alt="Gitfolio Demo" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://gitfolio-online.vercel.app/user/wangningkai">
    <img src="https://img.shields.io/badge/Live_Demo-Visit-success.svg?logo=vercel&style=for-the-badge" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/wangningkai/gitfolio-online.svg?style=flat-square" alt="GitHub Top Language">
  <img src="https://img.shields.io/github/last-commit/wangningkai/gitfolio-online.svg?style=flat-square" alt="GitHub Last Commit">
  <img src="https://img.shields.io/github/license/wangningkai/gitfolio-online.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Code Style">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=WangNingkai.gitfolio-online" alt="Visitors">
</p>

<p align="center">
  <a href="./README_CN.md">中文文档</a>
</p>

---

## Introduction

Gitfolio is a zero-configuration personal portfolio website that automatically fetches and displays your GitHub profile and repositories. No coding required—just use it and showcase your work to the world in seconds.

Perfect for developers, open-source contributors, and anyone who wants a professional GitHub portfolio without the hassle.

---

## Tech Stack

- **Runtime**: Node.js 12+
- **Template Engine**: Handlebars
- **HTTP Client**: Axios
- **DOM Parser**: jsdom
- **HTML Minifier**: html-minifier-terser
- **Testing**: Jest
- **Code Style**: Prettier + ESLint
- **Deployment**: Vercel

---

## Project Structure

```
gitfolio-online/
├── api/                # Vercel serverless function
│   └── index.js        # Main API endpoint
├── assets/             # Static assets
│   ├── index.html      # Base HTML template
│   ├── index.css       # Global styles
│   └── themes/         # Theme CSS files
│       ├── dark.css
│       ├── light.css
│       ├── auto.css    # Auto-follow system theme
│       └── dracula.css
├── src/                # Core modules
│   ├── fetch.js        # GitHub GraphQL API fetcher
│   ├── render.js       # Handlebars template renderer
│   ├── retryer.js      # Token rotation & retry logic
│   └── utils.js        # Utility functions
├── scripts/            # Development scripts
│   └── server.js       # Local dev server
├── tests/              # Test files
│   └── render.test.js
├── .env.example        # Environment variable template
├── package.json        # Project configuration
└── vercel.json         # Vercel deployment config
```

---

## Quick Start

Get your portfolio up and running in **30 seconds**:

Simply change `{username}` to your GitHub username:

```
https://gitfolio-online.vercel.app/user/{username}
# Or use the short version
https://gitfolio-online.vercel.app/u/{username}
```

That's it! 🎉

---

## Features

### 🎨 **Multiple Themes**

Switch between light, dark, auto, and dracula themes with a single URL parameter. The `auto` theme automatically follows your system's color scheme preference.

### 🔄 **Real-time Updates**

Automatically fetches your latest GitHub activity (with smart caching).

### ⚡ **Blazing Fast**

Built with Vercel Edge Network for lightning-fast global performance.

### 🛠️ **Highly Customizable**

Fine-tune every aspect of your portfolio with URL parameters.

### 🚀 **Zero Setup**

No configuration files, no build steps, no deployment needed—just use it.

### 📦 **Repository Filtering**

Choose which repositories to display (include/exclude forks, limit count).

---

## Customization

### Themes

Switch between built-in themes:

```
https://gitfolio-online.vercel.app/u/{username}?theme=dark
https://gitfolio-online.vercel.app/u/{username}?theme=light
https://gitfolio-online.vercel.app/u/{username}?theme=auto     # Follows system preference
https://gitfolio-online.vercel.app/u/{username}?theme=dracula  # Dracula color scheme
```

### Include/Exclude Forks

Control whether to display forked repositories:

```
https://gitfolio-online.vercel.app/u/{username}?includeFork=true
https://gitfolio-online.vercel.app/u/{username}?includeFork=false
```

### All Parameters

| Parameter       | Type    | Description                       | Default | Example                      |
| --------------- | ------- | --------------------------------- | ------- | ---------------------------- |
| `username`      | string  | Your GitHub username              | -       | `wangningkai`                |
| `theme`         | string  | Built-in theme name               | `dark`  | `dark`, `light`, `auto`, `dracula` |
| `includeFork`   | boolean | Display forked repositories       | `false` | `true`, `false`              |
| `repoNum`       | number  | Number of repositories to display | `30`    | `10`, `20`, `50`             |
| `cache_seconds` | number  | Cache duration in seconds         | `1800`  | `600`, `3600`                |

### Example Combinations

Combine multiple parameters:

```
https://gitfolio-online.vercel.app/u/wangningkai?theme=light&includeFork=true&repoNum=50
```

---

## Live Demo

Check out these live examples:

- **[wangningkai](https://gitfolio-online.vercel.app/u/wangningkai)** - Full portfolio with forks
- **[torvalds](https://gitfolio-online.vercel.app/u/torvalds)** - Linux creator's profile
- **[gaearon](https://gitfolio-online.vercel.app/u/gaearon)** - React core team member

---

## Local Development

Want to run Gitfolio locally? Follow these steps:

### Prerequisites

- Node.js 12+
- GitHub Personal Access Token (required for GitHub GraphQL API)

### Installation

```bash
# Clone the repository
git clone https://github.com/wangningkai/gitfolio-online.git
cd gitfolio-online

# Install dependencies
pnpm install
# or
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```env
# GitHub Personal Access Token (required for GitHub GraphQL API)
# Create one at https://github.com/settings/tokens
# Scopes needed: none (for public repos) or 'repo' (for private repos)
PAT_1=your_github_token_here

# Optional: Additional tokens for rate limit rotation (supports PAT_1 ~ PAT_8)
# When rate limit is hit, the system automatically rotates to the next token
# PAT_2=your_second_token_here
# PAT_3=your_third_token_here

# Custom cache duration in seconds (optional, range: 30min~24h)
CACHE_SECONDS=1800
```

### Running Locally

```bash
# Start the development server with hot reload
pnpm dev
# or
npm run dev

# Or start with specific port
PORT=3000 npm run dev
```

Visit `http://localhost:3000/u/{username}` to see your portfolio.

### Running Tests

```bash
# Run all tests
pnpm test
# or
npm test

# Run tests with watch mode
pnpm test -- --watch
```

---

## Deployment

### Deploy to Vercel (Recommended)

Click the button below to deploy to your own Vercel instance:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/wangningkai/gitfolio-online)

**Why deploy your own instance?**

- **Avoid rate limits**: GitHub API has a 5,000 requests/hour limit
- **Custom configuration**: Full control over caching and themes
- **Privacy**: Your own instance with your own analytics
- **Branding**: Add your own domain and customization

### Deploy to Other Platforms

Gitfolio works on any Node.js hosting platform:

- **Netlify**: Connect your Git repository
- **Heroku**: Use Heroku Buildpack for Node.js
- **Railway**: One-click deploy from GitHub
- **Render**: Deploy as a Node.js service
- **Self-hosted**: Run on any VPS or server

---

## FAQ

### Why do I need my own instance?

The GitHub API has rate limits (5,000 requests/hour). If many users share the same instance, you might encounter rate limit errors during peak hours. Deploying your own instance ensures consistent performance.

### Can I use my own custom theme?

Currently, Gitfolio supports built-in light/dark/auto/dracula themes. Custom theme support is planned for future releases.

### How does the auto theme work?

The `auto` theme detects your system's color scheme preference (light or dark) and automatically applies the matching theme. This works on all modern browsers that support `prefers-color-scheme` media query.

### How do I update my portfolio?

Gitfolio automatically fetches your latest GitHub data. Changes may take up to 30 minutes to appear (configurable with `cache_seconds` parameter).

### Is there a limit on repositories?

Yes, by default Gitfolio displays up to 30 repositories. You can adjust this with the `repoNum` parameter (max 100 to ensure performance).

### Can I hide specific repositories?

Currently, you can only show/hide all forks. Selective repository hiding is planned for future releases.

### How does token rotation work?

If you provide multiple tokens (PAT_1 through PAT_8), Gitfolio will automatically rotate to the next token when one hits the GitHub API rate limit, ensuring uninterrupted service.

---

## Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

Before reporting bugs, please read [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html).

Report bugs via:

- [GitHub Issues](https://github.com/WangNingkai/gitfolio-online/issues) (preferred)
- [Email: i@ningkai.wang](mailto:i@ningkai.wang)

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request

### Development Guidelines

- Follow Prettier code style
- Write clear commit messages
- Test thoroughly before submitting

---

## Support the Project

I open-source almost everything I can, and I try to help everyone using these projects. This takes time, and the service is provided for free.

If you find Gitfolio useful and want to support its development:

### 👏 Star and Share

- Star the repo on GitHub: ⭐
- Share it with your friends and colleagues: 🚀

### 💸 Donate

- **PayPal**: [paypal.me/wangningkai](https://www.paypal.me/wangningkai)
- **WeChat & AliPay**: [pay.ningkai.wang](https://pay.ningkai.wang)

Your support helps me continue creating and maintaining open-source projects! ❤️

---

## License

GPL-3.0 License - see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Inspired by the original [Gitfolio](https://github.com/imfunniee/gitfolio) project
- Built with [Vercel](https://vercel.com)
- Powered by [GitHub GraphQL API](https://docs.github.com/en/graphql)

---

**Made with ❤️ and JavaScript by [@wangningkai](https://github.com/wangningkai) and the open-source community.**