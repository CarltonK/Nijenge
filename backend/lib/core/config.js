"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportEnvironment = void 0;
// Environments
const environments = {
    // Staging Environment -> Default
    staging: {
        httpPort: process.env.PORT,
        httpsPort: 3001,
        envName: 'staging',
    },
    // Production Environment
    production: {
        httpPort: 5000,
        httpsPort: 5001,
        envName: 'production',
    }
};
// Determine which environment is to be exported as CLI arguments
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
// Check if currentEnvironment is defined above else default to staging
exports.exportEnvironment = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;
//# sourceMappingURL=config.js.map