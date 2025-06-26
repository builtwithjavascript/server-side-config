import { useServerSideConfig } from '@/server-side-config/'

interface IConfig {
  name: string
  marketing: {
    title: string
    hero: string
  }
  meta: {
    title: string
    description: string
  }
}

describe('useServerSideConfig', () => {
  const configFilesDirectoryPath = `src/tests/sample-config-files`

  it(`should return an instance of the config correctly when appKey argument is correct`, () => {
    const instance = useServerSideConfig<IConfig>('app1', configFilesDirectoryPath)
    expect(instance).toBeDefined()
    expect(instance.name).toEqual('for-unit-tests-only')
  })

  // it(`should return an instance of the default app1.json config when appKey argument is undefined`, () => {
  //   // @ts-ignore
  //   const instance = useServerSideConfig<IConfig>(undefined, absoluteConfigFilesDirectoryPath)
  //   expect(instance).toBeDefined()
  //   expect(instance.name).toEqual('for-unit-tests-only')
  // })

  // it(`should return an instance of the default app1.json config when appKey argument is undefined`, () => {
  //   const instance = useServerSideConfig<IConfig>(undefined, 'config/')
  //   expect(instance).toBeDefined()
  //   expect(instance.name).toEqual('for-unit-tests-only')
  // })

  // it(`should return an instance of the config correctly when appKey argument is correct and also the absoluteConfigFilesDirectoryPath argument is correct`, () => {
  //   const instance = useServerSideConfig<IConfig>('app1', absoluteConfigFilesDirectoryPath)
  //   expect(instance).toBeDefined()
  //   expect(instance.name).toEqual('for-unit-tests-only')
  // })
})
