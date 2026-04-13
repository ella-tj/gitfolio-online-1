![](https://cdn.jsdelivr.net/gh/wangningkai/wangningkai/assets/20200726173312.png)

<h1 align="center">Gitfolio Online</h1>

<p align="center">
  <strong>每个 GitHub 用户的个人作品集网站</strong>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> •
  <a href="#功能特性">功能特性</a> •
  <a href="#个性化配置">个性化配置</a> •
  <a href="#本地开发">本地开发</a> •
  <a href="#部署">部署</a>
</p>

<p align="center">
  <a href="https://gitfolio-online.vercel.app/user/wangningkai">
    <img src="https://cdn.jsdelivr.net/gh/wangningkai/wangningkai/assets/gitfolio-demo.gif" alt="Gitfolio 演示" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://gitfolio-online.vercel.app/user/wangningkai">
    <img src="https://img.shields.io/badge/Live_Demo-在线演示-success.svg?logo=vercel&style=for-the-badge" alt="在线演示">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/wangningkai/gitfolio-online.svg?style=flat-square" alt="主要语言">
  <img src="https://img.shields.io/github/last-commit/wangningkai/gitfolio-online.svg?style=flat-square" alt="最后提交">
  <img src="https://img.shields.io/github/license/wangningkai/gitfolio-online.svg?style=flat-square" alt="许可证">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="代码风格">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=WangNingkai.gitfolio-online" alt="访问量">
</p>

<p align="center">
  <a href="./README.md">English Version</a>
</p>

---

## 简介

Gitfolio 是一个零配置的个人作品集网站，能够自动获取并展示你的 GitHub 个人资料和仓库。无需编写任何代码，只需使用它，几秒钟内就能向全世界展示你的作品。

非常适合开发者、开源贡献者，以及任何想要一个专业 GitHub 作品集但不想折腾的人。

---

## 技术栈

- **运行环境**: Node.js 12+
- **模板引擎**: Handlebars
- **HTTP 客户端**: Axios
- **测试框架**: Jest
- **代码风格**: Prettier + ESLint
- **部署平台**: Vercel

---

## 项目结构

```
gitfolio-online/
├── api/                # Vercel 无服务器函数
│   └── index.js        # 主 API 端点
├── assets/             # 静态资源
│   ├── index.html      # 基础 HTML 模板
│   ├── index.css       # 全局样式
│   └── themes/         # 主题 CSS 文件
│       ├── dark.css
│       ├── light.css
│       ├── auto.css    # 自动跟随系统主题
│       └── dracula.css
├── src/                # 核心模块
│   ├── fetch.js        # GitHub GraphQL API 获取器
│   ├── render.js       # Handlebars 模板渲染器
│   ├── retryer.js      # Token 轮换与重试逻辑
│   └── utils.js        # 工具函数
├── scripts/            # 开发脚本
│   └── server.js       # 本地开发服务器
├── tests/              # 测试文件
│   └── render.test.js
├── .env.example        # 环境变量模板
├── package.json        # 项目配置
└── vercel.json         # Vercel 部署配置
```

---

## 快速开始

**30 秒** 内让你拥有自己的作品集：

只需将 `{username}` 替换为你的 GitHub 用户名：

```
https://gitfolio-online.vercel.app/user/{username}
# 或者使用短链接
https://gitfolio-online.vercel.app/u/{username}
```

就这么简单！🎉

---

## 功能特性

### 🎨 **多主题支持**

通过单个 URL 参数在浅色、深色、自动和 dracula 主题之间切换。`auto` 主题会自动跟随你系统的颜色方案偏好。

### 🔄 **实时更新**

自动获取你最新的 GitHub 活动（智能缓存）。

### ⚡ **极速访问**

基于 Vercel 边缘网络构建，全球超快访问速度。

### 🛠️ **高度可定制**

通过 URL 参数精细调整作品集的各个方面。

### 🚀 **零配置**

无需配置文件、无需构建步骤、无需部署——开箱即用。

### 📦 **仓库筛选**

选择要展示的仓库（包含/排除 fork，限制数量）。

---

## 个性化配置

### 主题切换

在内置主题之间切换：

```
https://gitfolio-online.vercel.app/u/{username}?theme=dark
https://gitfolio-online.vercel.app/u/{username}?theme=light
https://gitfolio-online.vercel.app/u/{username}?theme=auto     # 跟随系统偏好
https://gitfolio-online.vercel.app/u/{username}?theme=dracula  # Dracula 配色方案
```

### 包含/排除 Fork 仓库

控制是否显示 fork 的仓库：

```
https://gitfolio-online.vercel.app/u/{username}?includeFork=true
https://gitfolio-online.vercel.app/u/{username}?includeFork=false
```

### 所有参数

| 参数            | 类型    | 说明                 | 默认值  | 示例                         |
| --------------- | ------- | -------------------- | ------- | ---------------------------- |
| `username`      | string  | GitHub 用户名        | -       | `wangningkai`                |
| `theme`         | string  | 内置主题名称         | `dark`  | `dark`, `light`, `auto`, `dracula` |
| `includeFork`   | boolean | 是否显示 fork 的仓库 | `false` | `true`, `false`              |
| `repoNum`       | number  | 显示的仓库数量       | `30`    | `10`, `20`, `50`             |
| `cache_seconds` | number  | 缓存时长（秒）       | `1800`  | `600`, `3600`                |

### 参数组合示例

组合多个参数使用：

```
https://gitfolio-online.vercel.app/u/wangningkai?theme=light&includeFork=true&repoNum=50
```

---

## 在线演示

查看这些在线示例：

- **[wangningkai](https://gitfolio-online.vercel.app/u/wangningkai)** - 包含 fork 的完整作品集
- **[torvalds](https://gitfolio-online.vercel.app/u/torvalds)** - Linux 创作者的资料
- **[gaearon](https://gitfolio-online.vercel.app/u/gaearon)** - React 核心团队成员

---

## 本地开发

想在本地运行 Gitfolio？按照以下步骤操作：

### 前置要求

- Node.js 12+
- GitHub Personal Access Token（调用 GitHub GraphQL API 必需）

### 安装

```bash
# 克隆仓库
git clone https://github.com/wangningkai/gitfolio-online.git
cd gitfolio-online

# 安装依赖
pnpm install
# 或
npm install
```

### 配置

基于 `.env.example` 创建 `.env` 文件：

```env
# GitHub Personal Access Token（调用 GitHub GraphQL API 必需）
# 在 https://github.com/settings/tokens 创建
# 所需权限：无（公开仓库）或 'repo'（私有仓库）
PAT_1=你的_github_token_这里

# 可选：额外的 token 用于限速轮换（支持 PAT_1 ~ PAT_8）
# 当触发限速时，系统会自动轮换到下一个 token
# PAT_2=你的第二个_token
# PAT_3=你的第三个_token

# 自定义缓存时长（秒，可选，范围 30min~24h）
CACHE_SECONDS=1800
```

### 本地运行

```bash
# 启动开发服务器（支持热重载）
pnpm dev
# 或
npm run dev

# 或指定端口启动
PORT=3000 npm run dev
```

访问 `http://localhost:3000/u/{username}` 查看你的作品集。

### 运行测试

```bash
# 运行所有测试
pnpm test
# 或
npm test

# 以监视模式运行测试
pnpm test -- --watch
```

---

## 部署

### 部署到 Vercel（推荐）

点击下方按钮部署到你自己的 Vercel 实例：

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/wangningkai/gitfolio-online)

**为什么要部署自己的实例？**

- **避免限流**：GitHub API 有 5,000 次/小时的请求限制
- **自定义配置**：完全控制缓存和主题设置
- **隐私保护**：你自己的实例和数据分析
- **品牌定制**：添加自己的域名和自定义样式

### 部署到其他平台

Gitfolio 可在任何 Node.js 托管平台上运行：

- **Netlify**：连接你的 Git 仓库
- **Heroku**：使用 Heroku Node.js Buildpack
- **Railway**：从 GitHub 一键部署
- **Render**：部署为 Node.js 服务
- **自托管**：运行在任何 VPS 或服务器上

---

## 常见问题

### 为什么需要部署自己的实例？

GitHub API 有请求限制（5,000 次/小时）。如果多个用户共享同一个实例，在高峰时段可能会遇到限流错误。部署自己的实例可以确保持续稳定的性能。

### 可以使用自定义主题吗？

目前 Gitfolio 支持内置的浅色/深色/自动/dracula 主题。自定义主题支持计划在后续版本中推出。

### 自动主题是如何工作的？

`auto` 主题会检测你系统的颜色方案偏好（浅色或深色），并自动应用匹配的主题。这在所有支持 `prefers-color-scheme` 媒体查询的现代浏览器上都能工作。

### 如何更新我的作品集？

Gitfolio 会自动获取你最新的 GitHub 数据。更改可能需要最多 30 分钟才会显示（可通过 `cache_seconds` 参数配置）。

### 有仓库数量限制吗？

是的，默认情况下 Gitfolio 显示最多 30 个仓库。你可以通过 `repoNum` 参数调整（最多 100 个以确保性能）。

### 可以隐藏特定仓库吗？

目前你只能显示/隐藏所有 fork 的仓库。选择性隐藏仓库功能计划在后续版本中推出。

### Token 轮换是如何工作的？

如果你提供多个 token（PAT_1 到 PAT_8），当一个 token 达到 GitHub API 限速时，Gitfolio 会自动轮换到下一个 token，确保服务不中断。

---

## 贡献指南

欢迎贡献！以下是你可以帮忙的方式：

### 报告问题

报告问题前，请先阅读[提问的智慧](http://www.catb.org/~esr/faqs/smart-questions.html)。

通过以下方式报告问题：

- [GitHub Issues](https://github.com/WangNingkai/gitfolio-online/issues)（推荐）
- [Email: i@ningkai.wang](mailto:i@ningkai.wang)

### 提交 Pull Request

1. Fork 本仓库
2. 创建特性分支：`git checkout -b my-feature`
3. 提交更改：`git commit -am 'Add some feature'`
4. 推送到分支：`git push origin my-feature`
5. 提交 Pull Request

### 开发规范

- 遵循 Prettier 代码风格
- 编写清晰的提交信息
- 提交前进行充分测试

---

## 支持项目

我将几乎所有的代码都开源了，并尽力帮助每一位使用这些项目的开发者。这需要时间，我免费提供这项服务。

如果你觉得 Gitfolio 有用，并想支持它的继续开发：

### 👏 Star 和分享

- 在 GitHub 上 Star 这个项目：⭐
- 分享给朋友和同事：🚀

### 💸 捐赠

- **PayPal**：[paypal.me/wangningkai](https://www.paypal.me/wangningkai)
- **微信 & 支付宝**：[pay.ningkai.wang](https://pay.ningkai.wang)

你的支持帮助我继续创建和维护开源项目！❤️

---

## 许可证

GPL-3.0 许可证 - 查看 [LICENSE](LICENSE) 了解详情。

---

## 致谢

- 灵感来源于原版 [Gitfolio](https://github.com/imfunniee/gitfolio) 项目
- 使用 [Vercel](https://vercel.com) 构建
- 由 [GitHub GraphQL API](https://docs.github.com/en/graphql) 提供支持

---

**由 [@wangningkai](https://github.com/wangningkai) 和开源社区用 ❤️ 和 JavaScript 精心打造。**