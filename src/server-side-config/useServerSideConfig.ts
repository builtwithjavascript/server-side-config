// file: src/server-side-config/useServerSideConfig.ts

export const useServerSideConfig = <T>(
  siteKey: string | undefined,
  configFilesDirectoryPath: string = '../config/config-files'
): T => {
  // server side config used when running nuxt generate etc
  let configKey = (siteKey || '').trim().toLowerCase()
  if (configKey.length < 1) {
    configKey = 'app1'
  }
  const configFilePath = `${configFilesDirectoryPath}/${configKey}.json`

  let config!: T
  try {
    // @ts-ignore
    config = require(configFilePath)
  } catch (e) {
    let errMessage = `useServerSideConfig: 
      could not load config at path: "${configFilePath}", 
      or you are not running this code on a server`
    console.warn(errMessage)
    throw new Error(errMessage)
  }
  return config
}
