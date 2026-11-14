// Turn public/package-showcase.yml into the homepage "Used by" strip.
//
// The output is a self-contained <section> (no runtime script) injected through
// the {{showcase}} placeholder in src/site/home.html. If the file is missing,
// empty, or lists no projects, an empty string is returned and no section is
// rendered.

import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(ROOT, 'public', 'package-showcase.yml')

// js-yaml v4 exposes load() (safe by default); v3 exposes safeLoad(). The file
// is first-party and trusted, so load() is fine on either version.
const parseYaml = typeof yaml.load === 'function' ? yaml.load : yaml.safeLoad

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderMark(project, name) {
  const logo = project.logo
  const img = (src, cls = '') =>
    `<img class="showcase-logo-img${cls ? ` ${cls}` : ''}" src="${escapeHtml(src)}" alt="${name}" loading="lazy" />`

  if (typeof logo === 'string' && logo) return img(logo)

  if (logo && typeof logo === 'object') {
    const light = typeof logo.light === 'string' ? logo.light : ''
    const dark = typeof logo.dark === 'string' ? logo.dark : ''
    if (light && dark) return img(light, 'showcase-logo-img-light') + img(dark, 'showcase-logo-img-dark')
    const single = light || dark
    if (single) return img(single)
  }

  return `<span class="showcase-wordmark">${name}</span>`
}

function renderItem(project) {
  const name = escapeHtml(project.name || '')
  const mark = renderMark(project, name)

  const link = typeof project.link === 'string' ? project.link : ''
  const anchor = link
    ? `<a class="showcase-logo-link" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${mark}</a>`
    : `<span class="showcase-logo-link">${mark}</span>`

  return `<li class="showcase-logo">${anchor}</li>`
}

export async function renderShowcase() {
  let raw
  try {
    raw = await fsp.readFile(SOURCE, 'utf8')
  } catch {
    return ''
  }

  let data
  try {
    data = parseYaml(raw)
  } catch (err) {
    throw new Error(`Invalid YAML in ${path.relative(ROOT, SOURCE)}: ${err.message}`)
  }
  if (!data || typeof data !== 'object') return ''

  const projects = (Array.isArray(data.projects) ? data.projects : []).filter(
    (p) => p && typeof p === 'object' && (p.name || p.logo),
  )
  if (projects.length === 0) return ''

  const title = escapeHtml(data.title || 'Used by')
  const lede = data.description ? `\n    <p class="showcase-lede">${escapeHtml(data.description)}</p>` : ''
  const items = projects.map(renderItem).join('\n        ')

  return `<section class="showcase" aria-labelledby="showcase-heading">
  <div class="showcase-head">
    <p class="showcase-label" id="showcase-heading">${title}</p>${lede}
  </div>
  <div class="showcase-marquee">
    <div class="showcase-track">
      <ul class="showcase-logos">
        ${items}
      </ul>
      <ul class="showcase-logos showcase-logos-clone" aria-hidden="true">
        ${items}
      </ul>
    </div>
  </div>
</section>`
}
