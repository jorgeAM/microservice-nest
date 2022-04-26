import { Inject, Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { Video, VideoRepository } from '../domain'

@Injectable()
export class VideoCreator {
  constructor(@Inject('VideoRepository') private readonly repository: VideoRepository) {}

  run(title: string, duration: number, creatorId?: string): Promise<void> {
    const id = new ObjectId()

    const video = new Video(id.toHexString(), title, duration, creatorId)

    return this.repository.create(video)
  }
}
