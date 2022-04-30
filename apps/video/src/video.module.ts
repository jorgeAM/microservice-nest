import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MongoModule } from 'nest-mongodb'
import { VideoCreator } from './application'
import { VideoPostController } from './infrastructure/controller'
import { VideoMongoRepository } from './infrastructure/persistence'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'our_queue',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongoModule.forRoot('mongodb://localhost:27018', 'videoMicroservice'),
  ],
  controllers: [VideoPostController],
  providers: [
    VideoCreator,
    {
      provide: 'VideoRepository',
      useClass: VideoMongoRepository,
    },
  ],
})
export class VideoModule {}
