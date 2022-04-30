import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class UserListenEventController {
  @EventPattern('video-created')
  handleVideoCreatedEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()

    const originalMsg = context.getMessage()

    console.log('data from video service: ', data)

    channel.ack(originalMsg)
  }
}
