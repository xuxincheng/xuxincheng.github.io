# Xu's Log

Personal blog at **https://xuxincheng.github.io/**, built with [Hugo](https://gohugo.io/) and the
[PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

Inspired in structure by [lilianweng.github.io](https://lilianweng.github.io/) — a minimalist,
long-form, content-first blog optimized for technical writing with code, math, and citations.

---

## Features

- Hugo + PaperMod, deployed via GitHub Actions to GitHub Pages
- Light / dark theme with system auto-detection
- Tags, categories, archive, full-text search (Fuse.js)
- KaTeX math rendering (`$ ... $` and `$$ ... $$`)
- Syntax-highlighted code blocks with copy buttons
- Reading time, word count, table of contents
- RSS feed at `/index.xml`
- Fully responsive (mobile / tablet / desktop)

---

## Project layout

```
.
├── hugo.yaml                   # Site configuration
├── content/
│   ├── archives.md             # /archives page
│   ├── search.md               # /search page
│   └── posts/                  # Blog posts (one .md per post)
├── layouts/
│   └── partials/
│       └── extend_head.html    # KaTeX integration
├── static/                     # Static assets (favicon, robots.txt, images)
├── themes/PaperMod/            # Theme (git submodule)
└── .github/workflows/hugo.yml  # CI: build + deploy to GitHub Pages
```

---

## Local development

### 1. Install Hugo (extended)

macOS:

```bash
brew install hugo
```

Verify version is **0.128.0 or newer**:

```bash
hugo version
```

### 2. Clone with submodules

```bash
git clone --recurse-submodules https://github.com/xuxincheng/xuxincheng.github.io.git
cd xuxincheng.github.io
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

### 3. Run the dev server

```bash
hugo server -D
```

Open http://localhost:1313/.

### 4. Create a new post

```bash
hugo new posts/my-new-post.md
```

Edit the front matter (title, date, tags, categories, `summary`, `math: true` if needed),
write Markdown, and save. The dev server hot-reloads.

### 5. Build for production

```bash
hugo --gc --minify
```

Output goes to `./public/`.

---

## Deployment

Pushing to `main` triggers `.github/workflows/hugo.yml`, which:

1. Checks out the repo (with the PaperMod submodule)
2. Installs Hugo extended
3. Builds the site
4. Publishes to GitHub Pages

To enable this, in **Settings → Pages**, set **Source** to **GitHub Actions**.

---

## Front matter cheat sheet

```yaml
---
title: "Post title"
date: 2026-05-21T10:00:00+08:00
draft: false
math: true                       # enable KaTeX for this post
tags: ["llm", "agent"]
categories: ["machine-learning"]
summary: "One- or two-sentence summary shown in the post list."
ShowToc: true
TocOpen: false
---
```

---

## Credits

- Theme: [PaperMod](https://github.com/adityatelange/hugo-PaperMod) by Aditya Telange
- Inspiration: [Lil'Log](https://lilianweng.github.io/) by Lilian Weng
