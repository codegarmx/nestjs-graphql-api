import { registerAs } from '@nestjs/config'

export default registerAs('databaseConfig', () => ({
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_LISTENING_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}))
