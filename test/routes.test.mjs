import { test } from 'node:test'
import assert from 'node:assert/strict'

import { mdToRoute, buildRouteMap } from '../scripts/routes.mjs'

test('mdToRoute: primary docs routes', () => {
  assert.equal(mdToRoute('README.md'), '/docs/')
  assert.equal(mdToRoute('guide/getting-started.md'), '/guide/getting-started/')
  assert.equal(mdToRoute('guide/README.md'), '/guide/')
})

test('mdToRoute: secondary sources are mounted under their prefix', () => {
  assert.equal(mdToRoute('banner.md', 'plugins'), '/plugins/banner/')
  assert.equal(mdToRoute('README.md', 'plugins'), '/plugins/')
  assert.equal(mdToRoute('nested/README.md', 'plugins'), '/plugins/nested/')
  assert.equal(mdToRoute('banner.md', '/plugins/'), '/plugins/banner/')
})

test('buildRouteMap: namespaces secondary file keys', () => {
  const primary = buildRouteMap(['plugins/hooks.md'])
  assert.equal(primary.get('plugins/hooks.md'), '/plugins/hooks/')

  const secondary = buildRouteMap(['banner.md'], 'plugins', 'plugins')
  assert.equal(secondary.get('plugins/banner.md'), '/plugins/banner/')
})
