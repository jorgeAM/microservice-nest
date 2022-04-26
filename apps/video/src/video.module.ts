import { Module } from '@nestjs/common'
import { MongoModule } from 'nest-mongodb'
import { VideoCreator } from './application'
import { VideoPostController } from './infrastructure/controller'

@Module({
  imports: [MongoModule.forRoot('mongodb://localhost', 'videoMicroservice')],
  controllers: [VideoPostController],
  providers: [
    VideoCreator,
    {
      provide: 'VideoRepository',
      useClass: null,
    },
  ],
})
export class VideoModule {}
