// Given a version, figure out what the release notes are so that we can use this to pre-fill the
// relase notes on a GitHub release for the current version.

let path = require('path')
let fs = require('fs')

/**
 * Normalize newlines in the changelog string, fixes issue when running on Windows.
 * Doesn't do anything in CI but I think it's good to have it here so we don't waste time again in the future.
 */
function normalizeNewlines(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

/**
 * @typedef {"rp-icons" | "rp-illustrations"} PackageType
 */

/**
 * @see {@link PackageType}
 */
const packageType = process.argv[2]

if (!['rp-icons', 'rp-illustrations'].includes(packageType)) {
  throw new Error('Invalid package type. Must be "rp-icons" or "rp-illustrations".')
}

let version = process.env.npm_package_version || require(`../${packageType}/package.json`).version

/**
 * Reads the CHANGELOG.md file for a given {@link PackageType} and extracts the changelog entry for a specified version.
 * @description The changelog for the current package version.
 */
const changelog = normalizeNewlines(
  fs.readFileSync(path.resolve(__dirname, '..', packageType, 'CHANGELOG.md'), 'utf8')
)

/**
 * Whether the version is in the changelog for the current package @see {@link PackageType}
 */
let match = new RegExp(
  `## \\[${version}\\] - (.*)\\n\\n([\\s\\S]*?)\\n(?:(?:##\\s)|(?:\\[))`,
  'g'
).exec(changelog)

if (match) {
  let [, , notes] = match
  console.log(notes.trim())
} else {
  console.log(`Placeholder release notes for version: v${version}`)
}
