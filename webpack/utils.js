/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")

/**
 * Append root path to passed args.
 * @param args
 */
const appendRoot = (...args) => {
  const rootPath = path.dirname(__dirname)
  return path.resolve(rootPath, ...args)
}

/**
 * Returns a value based on active environment
 * @param dev
 * @param prod
 */
const envCmp = (dev, prod) => {
  return process.env.NODE_ENV === "development" ? dev : prod
}

module.exports = {
  envCmp,
  appendRoot,
}
