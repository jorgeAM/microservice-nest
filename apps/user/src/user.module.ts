import { Module } from '@nestjs/common'
import { UserCreator, UserFinder } from './application'
import { UserGetController, UserPostController } from './infrastructure/controller'

@Module({
  imports: [],
  controllers: [UserGetController, UserPostController],
  providers: [
    UserCreator,
    UserFinder,
    {
      provide: 'UserRepository',
      useClass: null,
    },
  ],
})
export class UserModule {}
