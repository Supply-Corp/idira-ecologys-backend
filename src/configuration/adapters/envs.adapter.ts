import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
};