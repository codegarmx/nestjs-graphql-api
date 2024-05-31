import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import * as compression from 'compression'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config: ConfigService = app.get(ConfigService)

  app.use(
    helmet({
      contentSecurityPolicy:
        config.get<string>('NODE_ENV') === 'production' ? undefined : false,
    }),
  )
  app.use(compression())
  await app.listen(config.getOrThrow<number>('LISTENING_PORT'))
}
bootstrap()
