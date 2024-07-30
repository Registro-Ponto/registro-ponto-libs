// Given a version, figure out what the release channel is so that we can publish to the correct
// channel on npm.
//
// E.g.:
//
//   1.2.3                  -> latest (default)
//   0.0.0-insiders.ffaa88  -> insiders
//   4.1.0-alpha.4          -> alpha

/**
 * @type {"rp-icons" | "rp-illustrations"}
 */
const packageType = process.argv[2]

if (!['rp-icons', 'rp-illustrations'].includes(packageType)) {
  throw new Error('Invalid package type. Must be "rp-icons" or "rp-illustrations".')
}

const packageTypeWithoutPrefix = packageType.replace('rp-', '')

let version = process.env.npm_package_version || require(`../${packageType}/package.json`).version

let match = /\d+\.\d+\.\d+-(.*)\.\d+/g.exec(version)

console.log(`${packageTypeWithoutPrefix}-${match ? match[1] : 'latest'}`)
