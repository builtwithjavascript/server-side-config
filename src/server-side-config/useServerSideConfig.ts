// file: src/server-side-config/useServerSideConfig.ts
import path from 'node:path'
import fs from 'node:fs' // Import the file system module

export const useServerSideConfig = <T>(
  siteKey: string | undefined,
  // This path should be relative to the *project root* of the consuming application.
  // Or, for your tests, relative to your package's root.
  // We'll clarify this below.
  configFilesDirectoryPath: string = 'src/config/config-files' // Default for consuming Nuxt app
): T => {
  let configKey = (siteKey || '').trim().toLowerCase()
  if (configKey.length < 1) {
    configKey = 'app1'
  }

  let config!: T
  let fullPath: string = ''

  try {
    // Determine the base path reliably
    // In a Nuxt application, process.cwd() will be the Nuxt project root.
    // In your package's tests, process.cwd() will be your package's root.
    const basePath = process.cwd()

    // Construct the full path using path.join
    // This correctly handles the varying base paths (package root for tests, project root for Nuxt app)
    fullPath = path.join(basePath, configFilesDirectoryPath, `${configKey}.json`)
    fullPath = path.normalize(fullPath) // Ensure path is normalized

    // Use fs.readFileSync to read the file content
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    // Parse the JSON content
    config = JSON.parse(fileContent)
  } catch (e: any) {
    let errMessage = `useServerSideConfig:
      could not load config at path: "${fullPath}",
      or you are not running this code on a server.
      Error: ${e.message} (Code: ${e.code || 'N/A'})`
    console.warn(errMessage)
    throw new Error(errMessage)
  }
  return config
}
