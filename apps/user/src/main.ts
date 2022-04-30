import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { UserModule } from './user.module'

async function bootstrap() {
  const app = await NestFactory.create(UserModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'our_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  })

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'our_queue',
  //     noAck: false,
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // })

  //3001
  app.startAllMicroservices()

  await app.listen(3001)
}
bootstrap()
