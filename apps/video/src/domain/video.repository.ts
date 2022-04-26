import { Video } from './video'

export interface VideoRepository {
  create(video: Video): Promise<void>
}
