import { Module } from '@nestjs/common'
import { MongoModule } from 'nest-mongodb'
import { VideoCreator } from './application'
import { VideoPostController } from './infrastructure/controller'
import { VideoMongoRepository } from './infrastructure/persistence'

@Module({
  imports: [MongoModule.forRoot('mongodb://localhost:27018', 'videoMicroservice')],
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
