import { generate } from 'openapi-typescript-codegen'

const generateApi = async () => {
    const schema = await fetch('http://localhost:3001/docs/schema.json').then(response => response.json())

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
