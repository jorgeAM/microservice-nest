import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserCreator, UserFinder } from './application'
import { UserGetController, UserListenEventController, UserPostController } from './infrastructure/controller'
import { UserPostgresRepository } from './infrastructure/persistence'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'our_queue',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
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
