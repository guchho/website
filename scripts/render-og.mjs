// Render the Open Graph banner for Guchho Test.
//
//   node scripts/render-og.mjs
//
// Uses a locally installed Chrome, Edge, or Chromium. Override the browser
// executable with CHROME_BIN.

import { existsSync, mkdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(ROOT, 'scripts', 'og', 'test-og.html')
const OUTPUT = path.join(ROOT, 'public', 'test-og.png')

const candidates = [
  process.env.CHROME_BIN,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]

const browser = candidates.find((candidate) => candidate && existsSync(candidate))
if (!browser) {
  console.error('No Chrome, Edge, or Chromium found. Set CHROME_BIN to the browser executable.')
  process.exit(1)
}

mkdirSync(path.dirname(OUTPUT), { recursive: true })

const result = spawnSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=1500',
    '--screenshot=' + OUTPUT,
    pathToFileURL(SOURCE).href,
  ],
  { stdio: 'inherit' },
)

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}
if (result.status !== 0) process.exit(result.status ?? 1)

console.log('Wrote ' + path.relative(ROOT, OUTPUT))
