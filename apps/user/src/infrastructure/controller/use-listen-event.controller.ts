import { Controller, Inject } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { UserRepository } from '../../domain'

@Controller()
export class UserListenEventController {
  constructor(@Inject('UserRepository') private readonly repository: UserRepository) {}

  @EventPattern('video-created')
  handleVideoCreatedEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()

    const originalMsg = context.getMessage()

    this.repository.updateVideoCounter(data?.creator)

    channel.ack(originalMsg)
  }
}
