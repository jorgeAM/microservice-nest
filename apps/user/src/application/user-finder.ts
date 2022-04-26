import { Inject, Injectable } from '@nestjs/common'
import { User, UserRepository } from '../domain'

@Injectable()
export class UserFinder {
  constructor(@Inject('UserRepository') private readonly repository: UserRepository) {}

  run(id: string): Promise<User> {
    const user = this.repository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
