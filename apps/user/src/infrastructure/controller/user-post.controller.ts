import { Body, Controller, Post } from '@nestjs/common'
import { UserCreator } from '../../application'

interface NewUserRequest {
  name: string
  surname: string
}

@Controller('users')
export class UserPostController {
  constructor(private readonly userCreator: UserCreator) {}

  @Post()
  run(@Body() body: NewUserRequest) {
    const { name, surname } = body

    return this.userCreator.run(name, surname)
  }
}
