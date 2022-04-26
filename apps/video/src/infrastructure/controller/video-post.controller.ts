import { Body, Controller, Post } from '@nestjs/common'
import { VideoCreator } from '../../application'

interface NewVideoRequest {
  title: string
  duration: number
}

@Controller('videos')
export class VideoPostController {
  constructor(private readonly videoCreator: VideoCreator) {}

  @Post()
  run(@Body() body: NewVideoRequest) {
    const { title, duration } = body

    return this.videoCreator.run(title, duration, null)
  }
}
