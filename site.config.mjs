export default {
  site: {
    name: 'Guchho',
    tagline: 'Fast HTML-first JavaScript, CSS & asset bundler',
    description:
      'Guchho is a fast, native bundler, compiler and build tool for modern web applications. It parses HTML, JavaScript, TypeScript, JSX/TSX, CSS and assets, and produces a complete, deployable output directory.',
    url: 'https://guchho.js.org',
    github: 'https://github.com/guchho/guchho',
    npm: 'https://www.npmjs.com/package/guchho',
    licenseUrl: 'https://github.com/guchho/guchho/blob/main/LICENSE',
    sponsorUrl: 'https://github.com/sponsors/code-hemu',
    copyright: 'CodeHemu',
    ogImage: '/guchho-og.png',
    ogImageAlt: 'Guchho — fast, HTML-first JavaScript, CSS & asset bundler',
    ogImageWidth: 1200,
    ogImageHeight: 630,
  },

  // The primary Markdown root (the Guchho docs repository).
  // Override with --docs <path> or the GUCHO_DOCS environment variable.
  docsRoot: '../guchho/docs',

  // Additional Markdown sources rendered into the same site. Each source is
  // mounted at routePrefix; pages from another source link across with
  // absolute site routes. A source is skipped when its root is missing,
  // except in CI, where a missing checkout is a hard error.
  docsSources: [
    {
      id: 'plugins',
      root: '../plugins/docs',
      env: 'GUCHO_PLUGINS_DOCS',
      routePrefix: 'plugins',
      repo: 'https://github.com/guchho/plugins',
      repoPath: 'docs',
      ogImage: '/plugins-og.png',
      ogImageAlt: 'Guchho Plugins — extend the build with hooks, loaders, and reporters',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      id: 'test',
      root: '../test/docs',
      env: 'GUCHO_TEST_DOCS',
      routePrefix: 'test',
      repo: 'https://github.com/guchho/test',
      repoPath: 'docs',
      ogImage: '/test-og.png',
      ogImageAlt: 'Guchho Test — fast, ESM-first JavaScript and TypeScript testing',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
  ],

  // Curated sidebar groups. "autodir" pulls every *.md in that docs directory
  // (its README becomes the group index); "links" are explicit entries.
  nav: [
    {
      title: 'Start',
      icon: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
      links: [
        { href: '/guide/getting-started/', label: 'Getting started' },
        { href: '/guide/introduction/', label: 'Introduction' },
        { href: '/guide/why-guchho/', label: 'Why Guchho' },
        { href: '/guide/core-concepts/', label: 'Core concepts' },
        { href: '/guide/configuration/', label: 'Configuration' },
        { href: '/guide/cli-overview/', label: 'CLI overview' },
        { href: '/guide/dev-server-and-watch/', label: 'Dev server & watch' },
      ],
    },
    {
      title: 'Guide',
      icon: '<path d="M12 6C9.5 4.5 6.5 4 4 4v13c2.5 0 5.5.5 8 2 2.5-1.5 5.5-2 8-2V4c-2.5 0-5.5.5-8 2z"/><path d="M12 6v13"/>',
      autodir: 'guide',
    },
    {
      title: 'API',
      icon: '<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>',
      links: [
        { href: '/api/', label: 'JavaScript API' },
        { href: '/api/classes/', label: 'Classes' },
        { href: '/api/compiler/', label: 'Compiler API' },
        { href: '/api/generated/', label: 'Options' },
        { href: '/api/generated/types/', label: 'Types & results' },
        { href: '/api/generated/plugin-types/', label: 'Plugin types' },
      ],
    },
    {
      title: 'Reference',
      icon: '<path d="M6 4h12v16l-6-4-6 4V4z"/>',
      autodir: 'reference',
    },
    {
      title: 'Plugins',
      icon: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
      links: [
        { href: '/plugins/', label: 'Writing plugins' },
        { href: '/plugins/hooks/', label: 'Hooks' },
        { href: '/plugins/context/', label: 'Context' },
        { href: '/plugins/banner/', label: 'banner' },
        { href: '/plugins/dts/', label: 'dts' },
      ],
    },
    {
      title: 'Testing',
      icon: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
      autodir: 'test',
    },
    {
      title: 'Embedding',
      icon: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
      links: [
        { href: '/embedding/', label: 'Embedding (C++)' },
        { href: '/embedding/generated/', label: 'Generated reference' },
      ],
    },
    {
      title: 'Recipes',
      icon: '<path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>',
      autodir: 'recipes',
    },
    {
      title: 'Resources',
      icon: '<path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>',
      autodir: 'resources',
    },
    {
      title: 'More',
      icon: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      links: [
        { href: '/playground/', label: 'Try in the browser' },
        { href: '/playground-guide/', label: 'Playground guide' },
        { href: '/blog/', label: 'Blog' },
        { href: '/release-notes/', label: 'Release notes' },
        { href: '/versions/', label: 'Versions' },
      ],
    },
  ],

  // Any route that is generated but not in the sidebar gets one of these
  // auto-groups; empty skips it.
  sideanchor: true,
}