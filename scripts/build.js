const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default
const babel = require('@babel/core')
const { dirname } = require('path')
const { deprecated } = require('./deprecated')

/**
 * Converts SVG to a React component, optionally marking it as deprecated.
 * Supports output in ESM or CJS format.
 *
 * @param {string} svg - The SVG content.
 * @param {string} componentName - The name for the React component.
 * @param {("esm"|"cjs")} format - The module format for the output.
 * @param {boolean} isDeprecated - Flag to mark the component as deprecated.
 * @returns {Promise<string>} The transformed component code.
 */
async function svgToReactComponent(svg, componentName, format, isDeprecated) {
  let component = await svgr(svg, { ref: true, titleProp: true }, { componentName })
  let { code } = await babel.transformAsync(component, {
    plugins: [[require('@babel/plugin-transform-react-jsx'), { useBuiltIns: true }]],
  })

  // Add a deprecation warning to the component
  if (isDeprecated) {
    /** @type {string[]} */
    let lines = code.split('\n')
    lines.splice(1, 0, `/** @deprecated */`)
    code = lines.join('\n')
  }

  code = code.replace('React.forwardRef(', '/*#__PURE__*/ React.forwardRef(')

  if (format === 'esm') {
    return code
  }

  return code
    .replace('import * as React from "react"', 'const React = require("react")')
    .replace('export default', 'module.exports =')
}

/**
 * 1. Asynchronously reads SVG files from a specified folder 
 * 2. Converts file names to PascalCase for component naming,
 * 3. Checks if the file is marked as deprecated.
 *
 * @param {string} folderName - The name of the folder within `./optimized` directory to read SVG files from.
 * @returns {Promise<Array<{svg: string, componentName: string, isDeprecated: boolean}>>} A promise that resolves with an array of objects,
 * each containing the SVG content, the componentName derived from the file name, and a boolean indicating if the file is deprecated.
 */
async function getSvgs(folderName) {
  let files = await fs.readdir(`./optimized/${folderName}`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${folderName}/${file}`, 'utf8'),
      componentName: `${camelcase(file.replace(/\.svg$/, ''), {
        pascalCase: true,
      })}`,
      isDeprecated: deprecated.includes(file),
    }))
  )
}

/**
 * Generates export statements for a list of icons in either ESM or CJS format.
 * Allows toggling of file extension inclusion in the import/require path.
 *
 * @param {Object[]} icons - Array of icon objects with componentName property.
 * @param {("esm"|"cjs")} format - Specifies the module format for the output.
 * @param {boolean} [includeExtension=true] - Flag to include '.js' extension in paths.
 * @returns {string} A string of export statements for the given icons.
 */
function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      let extension = includeExtension ? '.js' : ''
      if (format === 'esm') {
        return `export { default as ${componentName} } from './${componentName}${extension}'`
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`
    })
    .join('\n')
}

/**
 * Ensures the directory for the file exists, then writes text to the file.
 *
 * @param {string} file - The path to the file where the text will be written.
 * @param {string} text - The text to write to the file.
 */
async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true })
  await fs.writeFile(file, text, 'utf8')
}

/**
 * Converts a JSON object to a string with formatting and writes it to a file, ensuring the directory exists.
 *
 * @param {string} file - The path to the file where the JSON will be written.
 * @param {Object} json - The JSON object to write to the file.
 */
async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2) + '\n')
}

/**
 * Builds React components from SVGs for icons or illustrations, outputting in ESM or CJS format.
 * @param {("icons"|"illustrations")} packageName
 * @param {("esm"|"cjs")} format
 */
async function buildIcons(packageName, format) {
  let outDir = `./rp-${packageName}/${packageName}`
  if (format === 'esm') {
    outDir += '/esm'
  }

  let svgs = await getSvgs(packageName)

  await Promise.all(
    svgs.flatMap(async ({ componentName, svg, isDeprecated }) => {
      let content = await svgToReactComponent(svg, componentName, format, isDeprecated)

      /** @type {string[]} */
      let types = []

      types.push(`import * as React from 'react';`)

      if (isDeprecated) {
        types.push(`/** @deprecated */`)
      }

      types.push(
        `declare const ${componentName}: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;`
      )

      types.push(`export default ${componentName};`)

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types.join('\n') + '\n')] : []),
      ]
    })
  )

  await ensureWrite(`${outDir}/index.js`, exportAll(svgs, format))

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(svgs, 'esm', false))
}

/**
 * @param {("icons"|"illustrations")} packageName
 */
async function main(packageName) {
  const cjsPackageJson = { module: './esm/index.js', sideEffects: false }
  const esmPackageJson = { type: 'module', sideEffects: false }

  console.log(`Building package ${packageName}...`)

  await Promise.all([rimraf(`./rp-${packageName}/${packageName}/*`)])

  await Promise.all([
    buildIcons(packageName, 'cjs'),
    buildIcons(packageName, 'esm'),
    ensureWriteJson(`./rp-${packageName}/${packageName}/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./rp-${packageName}/${packageName}/package.json`, cjsPackageJson),
  ])

  return console.log(`Finished building the ${packageName} package.`)
}

/**
 * @type {("icons"|"illustrations")}
 */
const packageName = process.argv.slice(2)[0]

if (!packageName) {
  throw new Error('Please specify the package to be built: ("icons" || "illustrations")')
} else if (packageName !== 'icons' && packageName !== 'illustrations') {
  throw new Error('The argument after the build command must be "icons" or "illustrations"')
}

main(packageName)
