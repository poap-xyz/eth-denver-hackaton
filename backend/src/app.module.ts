import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    EventsModule,
    AccountsModule,
    PostsModule,
    ReactionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'poap_ethdenver',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ]
})
export class AppModule { }
