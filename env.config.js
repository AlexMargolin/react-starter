/* eslint-disable @typescript-eslint/no-var-requires,max-lines */
const fs = require("fs")
const dotenv = require("dotenv")

/**
 * Only allow prefixed variables
 * @type {RegExp}
 */
const ALLOWED_PREFIX = /APP_PUBLIC_/

/**
 * Valid env variable types
 * @type {string[]}
 */
const ALLOWED_ENV_TYPES = [".env.development", ".env.production"]

/**
 * Make sure environment can be determined
 */
if (!process.env.NODE_ENV) {
  throw new Error("Node environment cannot be determined")
}

/**
 * Read root directory files.
 * Filer only those with .env
 */
const envFiles = fs
  .readdirSync(__dirname)
  .filter(file => file.includes(".env"))

/**
 * Bail early if no files where found
 */
if (!envFiles.length) {
  console.log("No .env files were found")
  return
}

/**
 * Active env file name
 * @type {string}
 */
const envFileName = `.env.${process.env.NODE_ENV}`

/**
 * Filter expected .env
 * @type {boolean}
 */
const hasActiveVariable = envFiles.some(
  file => file === envFileName,
)

if (!hasActiveVariable) {
  throw new Error("No matching environment files were loaded")
}

/**
 * Make sure .env scope is valid
 */
if (!ALLOWED_ENV_TYPES.includes(envFileName)) {
  throw new Error("Invalid .env file scope was provided")
}

/**
 * @type {Buffer}
 */
const envSrc = fs.readFileSync(envFileName)

/**
 * All variables
 * @type {DotenvParseOutput}
 */
const envVars = dotenv.parse(envSrc)

/**
 * allowed only
 * @type {T[]}
 */
const environmentVariables = Object.entries(envVars)
  .filter(([key]) => ALLOWED_PREFIX.test(key))
  .reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {},
  )

module.exports = environmentVariables
