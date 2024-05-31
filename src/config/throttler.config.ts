import { registerAs } from '@nestjs/config'

export default registerAs('throttlerConfig', () => ({
  ttl: +process.env.THROTTLER_TTL,
  limit: +process.env.THROTTLER_LIMIT,
}))
