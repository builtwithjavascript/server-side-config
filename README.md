# @builtwithjavascript/server-side-config

[![npm version](https://badge.fury.io/js/@builtwithjavascript%2Fserver-side-config.svg)](https://badge.fury.io/js/@builtwithjavascript%2Fserver-side-config)

Hook `useServerSideConfig` to more easily load JSON files with strongly typed configuration models for use in Node.js environments (including frameworks like Nuxt, Next.js, etc.) on the server side.

## Codebase
TypeScript

## Description
This package provides a single hook:
- `useServerSideConfig`

## How to use

### IMPORTANT: This package should be installed as a local dependency (not globally) as it is designed for project-specific server-side configuration loading.

### Installation:
```bash
npm i -D @builtwithjavascript/server-side-config
```



### Consumption:

1. **Define your Configuration Model:** Create a TypeScript interface that defines the structure of your configuration file. Save it in your models directory or a suitable location (e.g., `./your-path-to-your-iconfig-model.ts`):

   TypeScript

   ```
   // your-path-to-your-iconfig-model.ts
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
   ```

2. **Create your JSON Configuration File:** Create a JSON file (e.g., `app1.json`) that adheres to your defined interface. By default, `useServerSideConfig` will look for config files within a directory you specify. A common convention is `config/config-files/`.

   Example `app1.json`:

   JSON

   ```
   {
     "name": "for-development",
     "marketing": {
       "title": "My Awesome App",
       "hero": "The best app ever!"
     },
     "meta": {
       "title":  "My App Title",
       "description": "A description of my awesome app."
     }
   }
   ```

3. **Integrate and Load the Configuration:** In your server-side code (e.g., `nuxt.config.ts`, API routes, Node.js server scripts), import the `useServerSideConfig` hook and your `IConfig` interface.

   **Crucially, you must provide the `configFilesDirectoryPath` argument.** This path should be **relative to the root of your project** (where your `package.json` resides, and where your Node.js process is typically started, i.e., `process.cwd()`).

   TypeScript

   ```
   import { useServerSideConfig } from '@builtwithjavascript/server-side-config'
   import type { IConfig } from './your-path-to-your-iconfig-model' // Adjust this path to your model
   
   // Example 1: Using a hardcoded app key (for specific scenarios or testing)
   const config = useServerSideConfig<IConfig>('app1', 'config/config-files');
   console.log(config.name); // Output: "for-development"
   
   // Example 2: Using an environment variable for the app key (recommended for dynamic environments)
   // Assuming your config files are in 'config/config-files/' relative to your project root
   const configFilesDir = 'config/config-files';
   
   // In Nuxt, this might be used in nuxt.config.ts for server-side operations
   // or in server/api routes.
   const instance = useServerSideConfig<IConfig>(process.env.SITE_KEY, configFilesDir);
   
   // Note: The `configFilesDir` parameter MUST be a path that `fs.readFileSync` can resolve
   // relative to the current working directory (`process.cwd()`) of your running Node.js process.
   // For most Nuxt/Next.js/Node projects, 'config/config-files' will be correct if your
   // config files are directly within a 'config/config-files' folder at your project root.
   ```

## Development Dependencies:

- `@types/jest`
- `@types/node`
- `jsdom`
- `prettier`
- `ts-node`
- `typescript`
- `vite`
- `vitest`
