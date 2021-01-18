/* eslint-disable @typescript-eslint/no-var-requires,max-lines */
const fs = require("fs")
const dotenv = require("dotenv")

/**
 * Only allow prefixed variables
 * @type {RegExp}
 */
const ALLOWED_PREFIX = /APP_PUBLIC_/

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
 * Make sure environment can be determined
 */
if (!process.env.NODE_ENV) {
  throw new Error("Node environment cannot be determined")
}

/**
 * lookup files beginning with .env
 * @type {[]}
 */
const foundEnvFiles = fs
  .readdirSync(__dirname)
  .filter(file => /^\.env/.test(file))

/**
 * Bail early if no files where found
 */
if (!foundEnvFiles.length) {
  console.log("No .env files were loaded")
  return
}

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

if (!scopeFiles.length) {
  throw new Error("No matching environment files were loaded")
}

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

/**
 * Export public variables to be defined by webpack
 * @type {T[]}
 */
module.exports = publicEnvVars
