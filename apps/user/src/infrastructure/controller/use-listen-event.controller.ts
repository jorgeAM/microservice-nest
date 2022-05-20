import { Controller, Inject } from '@nestjs/common'
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices'
import { UserRepository } from '../../domain'

interface VideoCreated {
  creator: string
}

@Controller()
export class UserListenEventController {
  constructor(@Inject('UserRepository') private readonly repository: UserRepository) {}

  @EventPattern('video.created')
  handleVideoCreatedEvent(@Payload() _: any, @Ctx() context: KafkaContext) {
    const originalMsg = context.getMessage()

    const data = originalMsg.value

    const payload = JSON.parse(JSON.stringify(data)) as VideoCreated

    this.repository.updateVideoCounter(payload.creator)
  }
}
