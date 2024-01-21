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
  it(`should return an instance of the config correctly when appKey argument is correct`, () => {
    const instance = useServerSideConfig<IConfig>('app1')
    expect(instance).toBeDefined()
    expect(instance.name).toEqual('for-unit-tests-only')
  })

  it(`should return an instance of the default app1.json config when appKey argument is not passed`, () => {
    // @ts-ignore
    const instance = useServerSideConfig<IConfig>()
    expect(instance).toBeDefined()
    expect(instance.name).toEqual('for-unit-tests-only')
  })

  it(`should return an instance of the default app1.json config when appKey argument is undefined`, () => {
    const instance = useServerSideConfig<IConfig>(undefined)
    expect(instance).toBeDefined()
    expect(instance.name).toEqual('for-unit-tests-only')
  })

  it(`should return an instance of the config correctly when appKey argument is correct and also the configFilesDirectoryPath argument is passed`, () => {
    const configFilesDirectoryPath = `../tests/sample-config-files`
    const instance = useServerSideConfig<IConfig>('app1', configFilesDirectoryPath)
    expect(instance).toBeDefined()
    expect(instance.name).toEqual('for-unit-tests-only')
  })
})
