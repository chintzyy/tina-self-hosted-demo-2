import { cleanEnv, str, makeValidator, EnvMissingError } from 'envalid'

const validStr = makeValidator((x) => {
  if (x.length < 1 ) { 
    throw new EnvMissingError('Required environment variable value missing')
  }
  return x
})
const env = cleanEnv(process.env, {
  S3_BUCKET: validStr(),
  S3_REGION: validStr(),
  S3_ACCESS_KEY: validStr(),
  S3_SECRET_KEY: validStr(),
  S3_BUCKET_DOMAIN: validStr(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
  NEXTAUTH_SECRET: validStr(),
})

export default env
