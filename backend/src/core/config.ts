// Environments
const environments: any = {
    // Staging Environment -> Default
    staging: {
        httpPort: process.env.PORT,
        httpsPort: 3001,
        envName: 'staging',
        // hashingSecret: 'thisIsASecret'
    },
    // Production Environment
    production: {
        httpPort: 5000,
        httpsPort: 5001,
        envName: 'production',
        // hashingSecret: 'thisIsAlsoASecret'
    }
}

// Determine which environment is to be exported as CLI arguments
const currentEnvironment: string = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check if currentEnvironment is defined above else default to staging
export const exportEnvironment: any = typeof(environments[currentEnvironment]) === 'object' ?  environments[currentEnvironment] : environments.staging
