/* eslint-disable max-lines */
const fs = require("fs")
const dotenv = require("dotenv")

/**
 * Make sure environment can be determined
 */
if (!process.env.NODE_ENV) {
  throw new Error("Node environment cannot be determined")
}

/**
 * Only allow prefixed variables
 * @type {RegExp}
 */
const ALLOWED_PREFIX = /APP_/

/**
 * .env files load order
 * high importance -> low importance
 * @type {string[]}
 */
const ENV_LOAD_ORDER = [
  ".env.development",
  ".env.production",
  ".env",
]

/**
 * lookup files beginning with .env
 * @type {[]}
 */
const foundEnvFiles = fs
  .readdirSync(__dirname)
  .filter(file => /^\.env/.test(file))

/**
 * Current scope files
 * @type {string[]}
 */
const scopeFiles = foundEnvFiles.filter(filename => {
  // Keep only .env or .env.{active_environment}
  const pattern = new RegExp(
    `^\\.env$|\\.env\\.${process.env.NODE_ENV}$`,
  )

  return pattern.test(filename)
})

/**
 * dontenv automatically applies variables to the
 * process.env object
 * @type {{}|*}
 */
const envVars = ENV_LOAD_ORDER.reduce((all, filename) => {
  if (!scopeFiles.includes(filename)) {
    return all
  }

  const { parsed } = dotenv.config({
    path: filename,
  })

  // First allocated items get the precedence
  return Object.assign(parsed, all)
}, {})

/**
 * Keep only prefixed variables
 * @type {[]}
 */
const publicEnvVars = Object.keys(envVars).filter(key =>
  ALLOWED_PREFIX.test(key),
)

console.log(
  "\x1b[36m%s\x1b[0m",
  `Loaded ${scopeFiles.length} .env file(s) with ${publicEnvVars.length} public variable(s)`,
)

/**
 * Export public variables to be defined by webpack
 * @type {T[]}
 */
module.exports = publicEnvVars
