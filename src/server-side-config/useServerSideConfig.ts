// file: src/server-side-config/useServerSideConfig.ts
import fs from 'fs'

export const useServerSideConfig = <T>(
  siteKey: string | undefined,
  configFilesDirectoryPath: string = '../config/config-files'
): T => {
  // server side config used when running nuxt generate etc
  let configKey = (siteKey || '').trim().toLowerCase()
  if (configKey.length < 1) {
    configKey = 'app1'
  }

  const configFilePath = `${!process?.env?.TESTING ? '../../../' : ''}${configFilesDirectoryPath}/${configKey}.json`
  const fullPath = configFilePath
  console.log('use-serverside-config: path exist', fs.existsSync(`${__dirname}${fullPath}`), `${__dirname}${fullPath}`)

  let config!: T
  try {
    // @ts-ignore
    config = require(fullPath)
  } catch (e) {
    let errMessage = `useServerSideConfig: 
      could not load config at path: "${fullPath}", 
      or you are not running this code on a server`
    console.warn(errMessage)
    throw new Error(errMessage)
  }
  return config
}
