# Gitfolio Online — Copilot Instructions

## 项目概述

Gitfolio Online 是一个零配置的 GitHub 个人作品集网站生成器，部署在 Vercel serverless 平台。用户只需访问 `/u/{username}` 即可自动生成作品集页面，无需任何配置。

## 架构概览

```
api/index.js          # Vercel serverless 入口，处理请求参数、缓存头
src/fetch.js          # GitHub GraphQL API 数据拉取（含多 token 重试）
src/render.js         # HTML 渲染（JSDOM + Handlebars + html-minifier）
src/retryer.js        # 多 token 轮换重试器（PAT_1 ~ PAT_8）
src/utils.js          # 工具函数（renderError, kFormatter, clampValue, parseBoolean, CONSTANTS）
scripts/server.js     # 本地开发服务器（模拟 Vercel serverless 请求格式）
assets/index.html     # 页面 HTML 模板
assets/themes/        # 主题 CSS（dark.css, light.css, dracula.css）
tests/                # Jest 单元测试
```

## 开发命令

```bash
npm run dev      # 启动本地开发服务器（等同于 npm start）
npm test         # 运行 Jest 测试
```

访问示例：`http://localhost:3000/u/{username}`

## 环境配置

本地开发需创建 `.env` 文件：

```env
PAT_1=your_github_personal_access_token   # 必须，GitHub GraphQL API 认证
PAT_2=your_second_token                    # 可选，用于多 token 轮换防止限速
CACHE_SECONDS=1800                         # 可选，缓存时长（秒）
```

- GitHub token 需要 `read:user` 和 `public_repo` scopes
- 支持最多 8 个 token（`PAT_1` ~ `PAT_8`），触发限速时自动轮换

## 项目约定

### 模块系统

- 全项目使用 **CommonJS**（`require` / `module.exports`），不使用 ES Modules

### Serverless 函数签名

- API 处理函数格式：`module.exports = async (req, res) => {}`
- `req.query` 包含 URL 查询参数（由 Vercel 或本地 server.js 注入）

### URL 参数

| 参数            | 类型    | 默认值  | 说明                               |
| --------------- | ------- | ------- | ---------------------------------- |
| `username`      | string  | -       | GitHub 用户名                      |
| `theme`         | string  | `dark`  | 主题名（`dark`/`light`/`dracula`） |
| `includeFork`   | boolean | `false` | 是否显示 Fork 仓库                 |
| `repoNum`       | number  | `30`    | 显示仓库数量                       |
| `cache_seconds` | number  | `1800`  | 缓存时长（钳制在 30min~24h）       |

### 主题扩展

- 新主题只需在 `assets/themes/` 下添加 `{name}.css` 文件
- 同时在 `src/utils.js` 的 `renderGithub` 函数中更新 `themeSource` 映射

### 渲染流程

1. `api/index.js` 验证参数 → 调用 `fetchInfo`
2. `src/fetch.js` 通过 GraphQL 拉取用户/仓库数据，失败时 `retryer` 自动换 token 重试
3. `src/render.js` 用 JSDOM 加载 `assets/index.html`，动态注入数据，最后 minify 输出

### 测试

- 测试文件放在 `tests/` 目录，命名格式 `*.test.js`
- 使用 `jest-environment-jsdom`（已在 `jest.config.js` 配置）
- 运行单个测试：`npx jest tests/render.test.js`

## 常见陷阱

- **本地无 token**：`PAT_1` 未设置时服务器会警告但不崩溃，GitHub API 调用会失败
- **主题文件缺失**：`render.js` 用 `fs.readFileSync` 读取主题 CSS，找不到时会抛出异常
- **repoNum 上限**：GitHub GraphQL API `repositories(first: N)` 限制最大 100，超出会报错
- **JSDOM 资源加载**：`render.js` 使用 `resources: 'usable'` 选项，本地测试时外部 CDN 资源（FontAwesome 等）需要网络
