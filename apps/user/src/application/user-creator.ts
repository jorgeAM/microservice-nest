import { Inject, Injectable } from '@nestjs/common'
import { User, UserRepository } from '../domain'

@Injectable()
export class UserCreator {
  constructor(@Inject('UserRepository') private readonly repository: UserRepository) {}

  run(name: string, surname: string): Promise<void> {
    const user = User.new(name, surname)

    return this.repository.create(user)
  }
}
