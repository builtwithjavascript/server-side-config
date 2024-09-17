# server-side-config
Hook useServerSideConfig to more easily load json files with strongly typed configuration models for use in Nuxt, Next, Node, etc on the server side

# @builtwithjavascript/server-side-config
Hook useServerSideConfig to more easily load json files with strongly typed configuration models for use in Nuxt, Next, Node, etc on the server side

[![npm version](https://badge.fury.io/js/@builtwithjavascript%2Fserver-side-config.svg)](https://badge.fury.io/js/@builtwithjavascript%2Fserver-side-config)

## code base
TypeScript

## Description
Contains hooks:
- useServerSideConfig

## How to use

### IMPORTANT: this node should not be installed globally as it will not work that way

### install:
```
npm i -D @builtwithjavascript/server-side-config
```

### consume:
```
// create the TypeScript interface that will define the structure of your config file
// and save it under your model or other directory ('./your-path-to-your-iconfig-model'):
// for example: 
interface IConfig {
  name: string,
  marketing: {
    title: string
    hero: string
  },
  meta: {
    title: string
    description: string
  }
}

// create a json file named app1.json that adheres to the above interface and save it 
// under a directory on your project (by default the hook will look into ./config/config-files/):
{
  "name": "for-unit-tests-only",
  "marketing": {
    "title": "For unit-tests only",
    "hero": "An example for the config file."
  },
  "meta": {
    "title":  "For unit-tests only",
    "description": "An example for the config file."
  }
}

// in the code where you need to consume the server-side config file (i.e. in Nuxt this would be in nuxt.config.ts), import a reference to the useServerSideConfig hook and your IConfig interface:
import { useServerSideConfig } from '@/server-side-config/'
import type { IConfig } from './your-path-to-your-iconfig-model'

// then load the server-side config file using the useServerSideConfig and passing the app key, in this case 'app1'
const instance = useServerSideConfig<IConfig>('app1')

// Note: usually you will read the value of 'app1' from an environment variable, i.e.
const instance = useServerSideConfig<IConfig>(process.env.SITE_KEY)

// the default base directory for your json files is /config/config-files/ 
// but you could optionally specify a different path by passing this as the second arugment:
const configFilesDirectoryPath = `../my-config-files/`
const instance = useServerSideConfig<IConfig>(process.env.SITE_KEY, configFilesDirectoryPath)

```

# Dev dependencies:
@types/jest @types/node jsdom prettier ts-node typescript vite vitest
