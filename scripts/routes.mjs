// Route mapping: a Markdown file relative to the docs root becomes a site route.
//
//   README.md                       -> /docs/
//   guide/getting-started.md        -> /guide/getting-started/
//   guide/README.md                 -> /guide/
//
// Every route is emitted as <route>/index.html, so links work with or without
// a trailing slash.

import path from 'node:path'

export const posix = (p) => p.split(path.sep).join('/')

export function mdToRoute(relPath, routePrefix = '') {
  const normalized = posix(relPath).replace(/^\.\//, '')
  let route
  if (normalized === 'README.md') route = '/docs/'
  else if (normalized.endsWith('/README.md')) {
    route = '/' + normalized.slice(0, -'/README.md'.length) + '/'
  } else {
    route = '/' + normalized.slice(0, -'.md'.length) + '/'
  }

  const prefix = routePrefix.replace(/^\/+|\/+$/g, '')
  if (!prefix) return route
  if (route === '/docs/') return `/${prefix}/`
  return `/${prefix}${route}`
}

export function routeSegments(route) {
  if (!route || route === '/') return []
  return route.split('/').filter(Boolean)
}

// Relative <base> prefix from a generated page file up to the project root.
// A page at src/pages/<segments>/index.html needs segments.length + 2 ".."s.
export function rootPrefix(route) {
  return '../'.repeat(routeSegments(route).length + 2)
}

// Where a route's HTML file is written, relative to the pages root.
export function routeToFile(route) {
  const segments = routeSegments(route)
  return [...segments, 'index.html'].join('/')
}

// Build the file-to-route map for every .md under the docs root.
// keyPrefix namespaces a secondary source so its file keys cannot collide
// with the primary docs tree.
export function buildRouteMap(files, routePrefix = '', keyPrefix = '') {
  const map = new Map()
  for (const rel of files) {
    const route = mdToRoute(rel, routePrefix)
    map.set(keyPrefix ? `${keyPrefix}/${rel}` : rel, route)
  }
  return map
}

// Resolve a possibly-relative Markdown link reference against a source file.
// Returns the resolved docs-relative path (posix, no leading slash), or null
// when the target is outside the docs tree.
export function resolveDocPath(sourceRel, href) {
  if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#')) return null
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null
  const clean = href.split('#')[0]
  if (!clean) return null
  const base = posix(path.posix.dirname(posix(sourceRel)))
  const resolved = path.posix.normalize(path.posix.join(base, clean))
  if (resolved.startsWith('..')) return null
  return resolved
}