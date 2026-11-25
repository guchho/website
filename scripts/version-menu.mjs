function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderVersionMenu(site) {
  const version = escapeHtml(site.version || '')
  const versionHref = escapeHtml(site.versionHref || '/versions/')
  const changelogHref = escapeHtml(site.changelogHref || '/release-notes/')
  const packages = (site.packages || []).filter((pkg) => pkg && pkg.name && pkg.href)

  const packageLinks = packages
    .map((pkg) => {
      const versionLabel = pkg.version ? `<span class="version-package-version">${escapeHtml(pkg.version)}</span>` : ''
      return `<a class="version-link" href="${escapeHtml(pkg.href)}"><span class="version-package-name">${escapeHtml(pkg.name)}</span>${versionLabel}</a>`
    })
    .join('\n        ')

  return `<div class="version-menu" data-version-menu>
      <button type="button" class="version-toggle" data-version-toggle aria-haspopup="true" aria-expanded="false" aria-controls="version-menu-panel">
        <span class="version-label">v${version}</span>
        <svg class="version-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>
      </button>
      <div class="version-panel" id="version-menu-panel" data-version-panel hidden>
        <nav aria-label="Guchho versions and packages">
          <div class="version-group">
            <p class="version-group-title">guchho</p>
            <a class="version-link" href="${versionHref}">v${version}</a>
            <a class="version-link" href="${changelogHref}">Changelog</a>
          </div>
          <div class="version-group">
            <p class="version-group-title">Other Packages</p>
        ${packageLinks}
          </div>
        </nav>
      </div>
    </div>`
}
