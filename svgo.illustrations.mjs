import path from 'path'

// Used to keep track of repeated paths in the SVGs. Prevents changes when rebuilding.
const repeatedPathTracker = []

export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // viewBox is required to resize SVGs with CSS.
          // @see https://github.com/svg/svgo/issues/1128
          removeViewBox: false,
        },
      },
    },
    {
      name: 'prefixIds',
      params: {
        delim: '',
        prefix: (_, { path: filePath }) => {
          // Calculate occurrences first
          const occurrences = repeatedPathTracker.filter((val) => val === filePath).length

          // Then push the filePath into the tracker
          repeatedPathTracker.push(filePath)

          return (
            path.basename(filePath).replace('.svg', '') +
            `${occurrences > 0 ? occurrences + 1 : ''}`
          )
        },
      },
    },
  ],
}
