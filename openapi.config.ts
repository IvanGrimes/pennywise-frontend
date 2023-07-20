import type { ConfigFile } from '@rtk-query/codegen-openapi'

const getPath = (name: string) => `./src/generated/rtk-query/${name}.ts`

const config: ConfigFile = {
    schemaFile: 'http://localhost:3001/docs/schema.json',
    apiFile: 'shared/api',
    outputFiles: {
        [getPath('auth')]: { filterEndpoints: (_, {path}) => path.includes('/auth/') },
        [getPath('user')]: { filterEndpoints: (_, {path}) => path.includes('/user/') },
        [getPath('email-verification')]: { filterEndpoints: (_, {path}) => path.includes('/email-verification/') },
        [getPath('session')]: { filterEndpoints: (_, {path}) => path.includes('/session/') },
        [getPath('reset-password')]: { filterEndpoints: (_, {path}) => path.includes('/reset-password/') },
        [getPath('transactions')]: { filterEndpoints: (_, {path}) => path.includes('/transactions/') },
        [getPath('accounts')]: { filterEndpoints: (_, {path}) => path.includes('/accounts/') },
        [getPath('categories')]: { filterEndpoints: (_, {path}) => path.includes('/categories/') },
    },
    hooks: false,
    tag: true,
}

export default config
