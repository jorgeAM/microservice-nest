import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { VideoModule } from './video.module'

async function bootstrap() {
  const app = await NestFactory.create(VideoModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'video-consumer',
      },
    },
  })

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(VideoModule, {
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

  //3002
  app.startAllMicroservices()

  await app.listen(3002)
}
bootstrap()
