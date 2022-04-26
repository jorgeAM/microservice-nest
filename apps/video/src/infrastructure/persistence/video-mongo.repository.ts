import { Injectable } from '@nestjs/common'
import { Collection, Db, ObjectId } from 'mongodb'
import { InjectDb } from 'nest-mongodb'
import { Video, VideoRepository } from '../../domain'

type VideoDoc = Omit<Video, 'id'> & { _id: ObjectId }

@Injectable()
export class VideoMongoRepository implements VideoRepository {
  private readonly collection: Collection

  constructor(@InjectDb() private readonly db: Db) {
    this.collection = this.db.collection('videos')
  }

  async create(video: Video): Promise<void> {
    const doc = this.toDoc(video)

    await this.collection.insertOne(doc)
  }

  private toDoc(video: Video): VideoDoc {
    const { id, title, duration, creatorId, createdAt, updatedAt } = video

    return {
      _id: new ObjectId(id),
      title,
      duration,
      creatorId,
      createdAt,
      updatedAt,
    }
  }
}
