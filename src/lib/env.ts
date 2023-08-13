import { cleanEnv, str } from 'envalid'

const env = cleanEnv(process.env, {
  DB_URI: str(),
  JWT_SECRET: str(),
  APP_MODE: str(),
});

export default env;