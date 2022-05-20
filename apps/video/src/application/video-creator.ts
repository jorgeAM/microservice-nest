import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ObjectId } from 'mongodb'
import { firstValueFrom } from 'rxjs'
import { Video, VideoCreated, VideoRepository } from '../domain'

@Injectable()
export class VideoCreator {
  constructor(
    @Inject('VideoRepository') private readonly repository: VideoRepository,
    @Inject('VIDEO_SERVICE') private client: ClientProxy,
  ) {}

  async run(title: string, duration: number, creatorId?: string): Promise<void> {
    const id = new ObjectId()

    const video = new Video(id.toHexString(), title, duration, creatorId)

    await this.repository.create(video)

    const event: VideoCreated = { creator: creatorId }

    await firstValueFrom(this.client.emit('video.created', event))
  }
}
