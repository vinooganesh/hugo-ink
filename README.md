# Ink

A minimal, blazing-fast Hugo theme for personal websites and blogs.

**Fast | Minimal | AI-Ready | Sub-100KB**

Built by [Vinoo Ganesh](https://vinoo.io) ([GitHub](https://github.com/vinooganesh))

---

![Ink theme — light mode](https://raw.githubusercontent.com/vinooganesh/hugo-ink/main/images/screenshot.png)

![Ink theme — dark mode](https://raw.githubusercontent.com/vinooganesh/hugo-ink/main/images/screenshot-dark.png)

---

## Features

- Sub-100KB first page load — no CDN, no Google Fonts, no external requests
- Flash-free light/dark mode with OS preference detection
- Self-hosted [Inter](https://rsms.me/inter/) font (Latin subset, ~76KB WOFF2 total)
- Minified and fingerprinted assets with SRI hashes
- No JavaScript frameworks — vanilla inline JS only
- Fuzzy search powered by [Fuse.js](https://www.fusejs.io/) (loaded only on search page)
- `llms.txt` output — structured site index for AI crawlers
- Ask AI buttons — one-click prompt to Claude, ChatGPT, Perplexity
- JSON-LD structured data (Article, WebSite, WebPage)
- Table of Contents (collapsible, per-post opt-in)
- Related posts (auto-generated, 3-column grid)
- Post series navigation
- Code copy button on all code blocks
- Full-content RSS feed with autodiscovery
- Dedicated [Now page](https://nownownow.com/about) layout
- Reading progress bar, scroll-to-top, sticky header
- Open Graph, Twitter Cards, canonical URLs
- Full i18n support (21 translatable UI strings)
- Keyboard accessible with ARIA labels and semantic HTML
- Print stylesheet and `prefers-reduced-motion` support
- Four responsive breakpoints

> Requires Hugo **v0.123.0** or later (extended edition recommended)

---

## Installation

### Method 1: Git Submodule (recommended)

```bash
hugo new site my-site
cd my-site
git init
git submodule add https://github.com/vinooganesh/hugo-ink.git themes/ink
```

Set the theme in `hugo.toml`:

```toml
theme = "ink"
```

**Updating:**

```bash
git submodule update --remote --merge
```

### Method 2: Hugo Module

Requires [Go](https://go.dev/dl/) installed.

```bash
hugo new site my-site
cd my-site
hugo mod init github.com/your-username/my-site
```

Add to `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/vinooganesh/hugo-ink"
```

**Updating:**

```bash
hugo mod get -u github.com/vinooganesh/hugo-ink
```

### Method 3: Download

Download the [latest release](https://github.com/vinooganesh/hugo-ink/releases) and extract into `themes/ink/`.

---

## Quick Start

After installing, the fastest way to get running:

```bash
# Copy the example configuration
cp themes/ink/exampleSite/hugo.toml hugo.toml

# Create your first post
hugo new posts/hello-world.md

# Start the dev server
hugo server
```

Open [http://localhost:1313](http://localhost:1313) to see your site.

The `exampleSite/` directory contains a full working site you can reference for content structure and configuration.

---

## Configuration

### Minimal `hugo.toml`

The minimum config to get a working site:

```toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Site"
theme = "ink"

[params]
  author = "Your Name"
  description = "My personal site."
  homeTitle = "Your Name"
  homeSubtitle = "A short tagline."

[menu]
  [[menu.main]]
    name = "Blog"
    url = "/posts/"
    weight = 1

[outputs]
  home = ["HTML", "RSS"]
```

### Full `hugo.toml`

All available options with comments:

```toml
baseURL = "https://example.com/"
languageCode = "en-us"
title = "Your Name"
theme = "ink"

[params]
  author = "Your Name"
  description = "Designer, developer, and writer."
  homeTitle = "Your Name"
  homeSubtitle = "Designer, developer, and writer."
  homeBio = "I build things for the web and write about technology, design, and the craft of making software."
  homeImage = "/images/avatar.jpg"    # Avatar on homepage (place in static/images/, renders as 110px circle)
  favicon = "/favicon.ico"            # Place in static/
  recentPostsCount = 3                # Posts shown on homepage (default: 3)

  # Social links — displayed in the homepage hero section
  [[params.socialLinks]]
    name = "GitHub"
    url = "https://github.com"
    external = true                   # Opens in new tab with external link indicator
  [[params.socialLinks]]
    name = "LinkedIn"
    url = "https://linkedin.com"
    external = true
  [[params.socialLinks]]
    name = "Email"
    url = "mailto:hello@example.com"
  [[params.socialLinks]]
    name = "Blog"
    url = "/posts/"

  # Ask AI buttons — shown on homepage, configurable
  # If omitted entirely, defaults to Claude, ChatGPT, and Perplexity
  # Use PROMPT in URL for tools with native query support
  [[params.askAI]]
    name = "Claude"
    url = "https://claude.ai/new"
  [[params.askAI]]
    name = "ChatGPT"
    url = "https://chatgpt.com/"
  [[params.askAI]]
    name = "Perplexity"
    url = "https://perplexity.ai/search?q=PROMPT"

# Navigation menu
[menu]
  [[menu.main]]
    name = "Now"
    url = "/now/"
    weight = 1
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 2
  [[menu.main]]
    name = "Blog"
    url = "/posts/"
    weight = 3

# Output formats — add "llmstxt" and "JSON" to enable llms.txt and search
[outputs]
  home = ["HTML", "RSS", "llmstxt", "JSON"]

[outputFormats.llmstxt]
  mediaType = "text/plain"
  baseName = "llms"
  isPlainText = true
  notAlternative = true

# Related posts — powers the "Related Posts" section on blog posts
[related]
  includeNewer = true
  threshold = 80
  toLower = true
  [[related.indices]]
    name = "tags"
    weight = 100
  [[related.indices]]
    name = "date"
    weight = 10
```

### Site Parameters Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `author` | string | — | Author name for meta tags |
| `description` | string | — | Site description for SEO |
| `homeTitle` | string | — | Large heading on homepage |
| `homeSubtitle` | string | — | Subtitle below the heading |
| `homeBio` | string | — | Paragraph text on homepage |
| `homeImage` | string | — | Avatar image path (110px circle) |
| `favicon` | string | — | Favicon path |
| `recentPostsCount` | int | `3` | Number of posts on homepage |
| `socialLinks` | array | — | Social links in hero section |
| `askAI` | array | Claude, ChatGPT, Perplexity | AI prompt buttons on homepage |

---

## Content

### Directory Structure

```
content/
  about.md              # About page
  now.md                # Now page (uses layout: "now")
  search.md             # Search page (uses layout: "search")
  posts/
    my-first-post.md
    another-post.md
```

### Blog Post Front Matter

```yaml
---
title: "My Post"
date: 2026-02-15
tags: ["go", "web"]
description: "A short description for SEO and post cards."
ShowToc: true              # Show table of contents (default: false)
TocOpen: true              # TOC starts expanded (default: false)
series: "My Series"        # Group posts into a navigable series
searchHidden: true         # Exclude from search index (default: false)
hidden: true               # Exclude from llms.txt (default: false)
cover: "/images/cover.jpg" # Open Graph / Twitter Card image
---
```

### Front Matter Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | — | Post title |
| `date` | date | — | Publication date |
| `tags` | array | — | Tags for categorization and related posts |
| `description` | string | — | SEO meta description and post card summary |
| `ShowToc` | bool | `false` | Show table of contents |
| `TocOpen` | bool | `false` | TOC expanded by default |
| `series` | string | — | Series name for multi-part posts |
| `searchHidden` | bool | `false` | Hide from search index |
| `hidden` | bool | `false` | Hide from llms.txt |
| `cover` | string | — | Image for Open Graph / Twitter Cards |

### Special Pages

**Search page** — Create `content/search.md`:

```yaml
---
title: "Search"
layout: "search"
searchHidden: true
---
```

Requires `"JSON"` in your `[outputs]` config. Search is powered by Fuse.js and loads only on this page.

**Now page** — Create `content/now.md`:

```yaml
---
title: "Now"
layout: "now"
subtitle: "What I'm up to these days"
---
```

Uses a dedicated layout. Learn more about [Now pages](https://nownownow.com/about).

**About page** — Create `content/about.md`:

```yaml
---
title: "About"
---
```

Uses the default single page layout.

---

## Customization

### Colors

The theme uses 17 CSS custom properties with full light/dark pairs. Override them in your own stylesheet:

```css
:root {
  --bg: #ffffff;
  --text: #111111;
  --link: #0066cc;
  /* ... */
}
```

| Variable | Light | Dark | Used for |
|----------|-------|------|----------|
| `--bg` | `#fafaf9` | `#1c1917` | Page background |
| `--text` | `#1c1917` | `#fafaf9` | Primary text |
| `--text-secondary` | `#78716c` | `#a8a29e` | Meta text, subtitles |
| `--link` | `#2563eb` | `#60a5fa` | Link color |
| `--link-hover` | `#1d4ed8` | `#93bbfd` | Link hover |
| `--accent` | `#2563eb` | `#60a5fa` | Focus rings, progress bar |
| `--border` | `#e7e5e4` | `#44403c` | Borders, dividers |
| `--code-bg` | `#f5f5f4` | `#292524` | Inline code background |
| `--code-text` | `#44403c` | `#d6d3d1` | Inline code text |
| `--code-block-bg` | `#1e1e1e` | `#292524` | Code block background |
| `--code-block-text` | `#d4d4d4` | `#d6d3d1` | Code block text |
| `--tag-bg` | `#f5f5f4` | `#292524` | Tag pill background |
| `--tag-text` | `#44403c` | `#d6d3d1` | Tag pill text |
| `--blockquote-border` | `#d6d3d1` | `#57534e` | Blockquote left border |
| `--selection-bg` | `#2563eb` | `#60a5fa` | Text selection background |
| `--selection-text` | `#fff` | `#1c1917` | Text selection text |
| `--hover-bg` | `#f5f5f4` | `#292524` | Card hover background |

### Ask AI Buttons

Configurable via `params.askAI`. If omitted entirely, defaults to Claude, ChatGPT, and Perplexity.

Add any AI tool:

```toml
[[params.askAI]]
  name = "Gemini"
  url = "https://gemini.google.com/"
```

If a tool supports URL-based prompts, include `PROMPT` in the URL — it will be replaced with the auto-generated prompt. For tools without URL prompt support, the prompt is copied to clipboard before opening.

To disable Ask AI buttons entirely, set an empty array:

```toml
[params]
  askAI = []
```

### i18n / Translations

The theme ships with English (`i18n/en.yaml`). All 21 UI strings are translatable.

Create `i18n/xx.yaml` in your site root for your language:

```yaml
# i18n/es.yaml
prev: "← Anterior"
next: "Siguiente →"
search: "Buscar"
search_placeholder: "Escribir para buscar..."
search_no_results: "No se encontraron resultados."
search_unavailable: "Indice de busqueda no disponible."
search_requires_js: "La busqueda requiere JavaScript."
recent: "Recientes"
view_all: "Ver todo"
toggle_theme: "Cambiar tema"
scroll_to_top: "Ir arriba"
copy: "copiar"
copied: "Copiado!"
toc_title: "Tabla de contenidos"
related_posts: "Articulos relacionados"
ask_ai_label: "Pregunta a la IA sobre este sitio"
page_not_found: "Pagina no encontrada"
back_home: "Volver al inicio"
series: "Serie"
min_read:
  one: "1 min de lectura"
  other: "{{ .Count }} min de lectura"
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Alt + T` | Toggle light/dark mode |
| `/` | Focus search input (on search page) |
| `Escape` | Clear search input |

---

## Performance

| Asset | Size |
|-------|------|
| CSS (minified) | ~15 KB |
| Inter 400 (Latin WOFF2) | 37 KB |
| Inter 700 (Latin WOFF2) | 38 KB |
| Inline JS | ~2 KB |
| Fuse.js (search page only) | 15.4 KB |
| **Homepage first load** | **~95 KB** |

No external requests. No CDN. No Google Fonts. Everything is self-hosted.

---

## Credits

- [Inter](https://rsms.me/inter/) typeface by Rasmus Andersson (SIL Open Font License)
- [Fuse.js](https://www.fusejs.io/) by Kiro Risk (Apache 2.0)
- Inspired by [PaperMod](https://github.com/adityatelange/hugo-PaperMod)

## License

[MIT](LICENSE)
