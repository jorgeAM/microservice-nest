import { Module } from '@nestjs/common'
import { UserCreator, UserFinder } from './application'
import { UserGetController, UserListenEventController, UserPostController } from './infrastructure/controller'
import { UserPostgresRepository } from './infrastructure/persistence'

@Module({
  imports: [],
  controllers: [UserGetController, UserPostController, UserListenEventController],
  providers: [
    UserCreator,
    UserFinder,
    {
      provide: 'UserRepository',
      useClass: UserPostgresRepository,
    },
  ],
})
export class UserModule {}
