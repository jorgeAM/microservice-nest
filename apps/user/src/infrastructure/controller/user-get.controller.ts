import { Controller, Get, Param } from '@nestjs/common'
import { UserFinder } from '../../application'

@Controller('users/:userId')
export class UserGetController {
  constructor(private readonly userFinder: UserFinder) {}

  @Get()
  run(@Param('userId') userId: string) {
    return this.userFinder.run(userId)
  }
}
