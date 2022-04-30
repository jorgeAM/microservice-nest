import { Body, Controller, Post } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { VideoCreator } from '../../application'

interface NewVideoRequest {
  title: string
  duration: number
  creatorId: string
}

@Controller('videos')
export class VideoPostController {
  constructor(private readonly videoCreator: VideoCreator) {}

  @Post()
  run(@Body() body: NewVideoRequest) {
    const { title, duration, creatorId } = body

    return this.videoCreator.run(title, duration, creatorId)
  }
}
