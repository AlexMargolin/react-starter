const path = require("path")

/**
 * Append root path to passed args.
 * @param args
 */
const appendRoot = (...args) => {
  return path.resolve(path.dirname(__dirname), ...args)
}

/**
 * Returns a value based on the active environment
 * @param dev
 * @param prod
 */
const envCmp = (dev, prod) => {
  return process.env.NODE_ENV === "development" ? dev : prod
}

module.exports = { appendRoot, envCmp }
