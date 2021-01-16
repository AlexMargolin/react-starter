import path from "path"

/**
 * Append root path to passed args.
 * @param args
 */
export const appendRoot = (...args: string[]): string => {
  const rootPath = path.dirname(__dirname)
  return path.resolve(rootPath, ...args)
}

/**
 * Returns a value based on active environment
 * @param dev
 * @param prod
 */
export const envCmp = <T, K>(dev: T, prod: K): T | K => {
  return process.env.NODE_ENV === "development" ? dev : prod
}
