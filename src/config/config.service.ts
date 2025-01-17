import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
        this.envConfig = this.loadEnvFile(envFile);
    }

    private loadEnvFile(file: string): { [key: string]: string } {
        const env = config({ path: file }).parsed;
        if (!env) {
            throw new Error(`Unable to load environment variables from ${file}`);
        }
        return env;
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
