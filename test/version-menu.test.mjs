import { test } from 'node:test'
import assert from 'node:assert/strict'

import siteConfig from '../site.config.mjs'
import { renderVersionMenu } from '../scripts/version-menu.mjs'

test('version menu renders the current version and changelog links', () => {
  const html = renderVersionMenu(siteConfig.site)
  assert.match(html, /aria-haspopup="true"/)
  assert.match(html, /aria-expanded="false"/)
  assert.match(html, /aria-controls="version-menu-panel"/)
  assert.match(html, />v1\.1\.0</)
  assert.match(html, /href="\/release-notes\/v1\.1\.0\/"/)
  assert.match(html, /href="\/release-notes\/"/)
  assert.match(html, />Other Packages</)
})

test('version menu renders every official package link', () => {
  const html = renderVersionMenu(siteConfig.site)
  assert.equal(siteConfig.site.packages.length, 5)
  for (const pkg of siteConfig.site.packages) {
    assert.ok(html.includes(`href="${pkg.href}"`), `missing link for ${pkg.name}`)
    assert.ok(html.includes(pkg.name), `missing name ${pkg.name}`)
    assert.ok(html.includes(pkg.version), `missing version for ${pkg.name}`)
  }
})
