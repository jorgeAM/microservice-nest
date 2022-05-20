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
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'video',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'video-consumer',
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
