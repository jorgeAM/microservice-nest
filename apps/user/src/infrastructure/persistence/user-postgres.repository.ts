import { Injectable } from '@nestjs/common'
import { User, UserRepository } from '../../domain'

@Injectable()
export class UserPostgresRepository implements UserRepository {
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
