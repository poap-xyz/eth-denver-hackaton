import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { ReactionModule } from './reaction/reaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    EventsModule,
    AccountsModule,
    PostsModule,
    ReactionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.0.0.150',
      port: 3306,
      username: 'root',
      password: 'CarGGIEpXh',
      database: 'ethdenver',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ]
})
export class AppModule { }
