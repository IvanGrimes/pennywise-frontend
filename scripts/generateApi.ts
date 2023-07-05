import { generate } from 'openapi-typescript-codegen'
import fetch from 'node-fetch'

const generateApi = async () => {
    const schema = await fetch('http://localhost:3001/docs/schema.json').then(response => response.json() as Record<string, any>)

    await generate({
        input: schema,
        output: './src/generated/api',
        clientName: 'Api',
        httpClient: 'axios',
        exportModels: true,
        exportCore: true,
    })
}

generateApi()
