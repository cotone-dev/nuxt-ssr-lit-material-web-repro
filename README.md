# Reproduction: `HTMLElement is not defined` with nuxt-ssr-lit and @material/web

This repository reproduces an issue where a `500 HTMLElement is not defined` error occurs on page load in a built Nuxt environment when using `nuxt-ssr-lit` with `@material/web` components.

## Problem

In a production-like build environment (e.g., after running `bun run build && bun run preview` or when deployed to Cloudflare Pages), attempting to load a page that utilizes `@material/web` components results in a server-side error: `500 HTMLElement is not defined`.

## Environment & Dependencies

| Category       | Item          | Version       |
| -------------- | ------------- | ------------- |
| **OS**         | macOS         | 15.6.1        |
| **Browser**    | Google Chrome | 140.0.7339.81 |
| **Node.js**    | Node.js       | 24.7.0        |
| **Bun**        | Bun           | 1.2.21        |
| **Framework**  | Nuxt          | 4.1.0         |
| **UI Library** | @material/web | 2.4.0         |
| **SSR Helper** | nuxt-ssr-lit  | 1.6.32        |

## Deployment Target

Cloudflare Pages

## Steps to Reproduce

1.  **Clone this repository:**

```zsh
git clone git@github.com:cotone-dev/nuxt-ssr-lit-material-web-repro.git
cd nuxt-ssr-lit-material-web-repro
```

2.  **Install dependencies:**

```zsh
bun i
```

3.  **Build and preview the application:**

```zsh
bun run build && bun run preview
```

4.  **Access the preview page:**
    When prompted by the preview server:

```
[b] open a browser, [d] open devtools, [c] clear console, [x] to exit
```

Press `b` to open the page in your browser.

5.  **Observe the 500 error:**
    The page will display: "500 HTMLElement is not defined".

**Error Object Contents:**

```json
{
  "error": true,
  "message": "HTMLElement is not defined",
  "statusCode": 500,
  "statusMessage": "Server Error",
  "url": "/"
}
```

**Wrangler Log (or similar server log for `bun run preview`):**

```
[wrangler:inf] GET / 500 Server Error (233ms)
```

_(Note: The log might vary slightly depending on the preview server, but the 500 error related to HTMLElement should be present.)_

## What I've Tried

- Adding `'@material/web'` to `nitro.moduleSideEffects` in `nuxt.config.ts`. This did not resolve the issue.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  nitro: {
    moduleSideEffects: ['@material/web'],
  },
  // ...
});
```

## Expected Behavior

`@material/web` components should be usable in a Nuxt SSR environment without throwing an `HTMLElement is not defined` error during server-side rendering. The page should render correctly.
