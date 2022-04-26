import { v4 as uuidV4 } from 'uuid'

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly surname: string,
    readonly videosCreated?: number,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {}

  static new(name: string, surname: string): User {
    return new User(uuidV4(), name, surname, 0)
  }
}
