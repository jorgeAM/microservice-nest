import { Client } from 'pg'
import { Injectable } from '@nestjs/common'
import { User, UserRepository } from '../../domain'

interface userPostgresDTO {
  id: string
  name: string
  surname: string
  videosCreated: number
  createdat: Date
  updatedat: Date
}

@Injectable()
export class UserPostgresRepository implements UserRepository {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      user: 'admin',
      host: '127.0.0.1',
      database: 'userDb',
      password: '123456',
      port: 5432,
      ssl: false,
    })

    this.client.connect()
  }

  async create(user: User): Promise<void> {
    const { id, name, surname, videosCreated, createdAt, updatedAt } = user

    const queryText = 'INSERT INTO users(id, name, surname, videoscreated, createdat, updatedat) VALUES($1, $2, $3, $4, $5, $6)'

    await this.client.query(queryText, [id, name, surname, videosCreated, createdAt, updatedAt])
  }

  async findById(id: string): Promise<User> {
    const res = await this.client.query<userPostgresDTO>('SELECT * FROM users WHERE id = $1', [id])

    if (res.rows.length === 0) {
      throw new Error('User not found')
    }

    const dto = res.rows[0]

    return this.toEntity(dto)
  }

  private toEntity(dto: userPostgresDTO): User {
    const { id, name, surname, videosCreated, createdat, updatedat } = dto

    return new User(id, name, surname, videosCreated, createdat, updatedat)
  }
}
