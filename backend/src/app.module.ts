import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { AccountsModule } from './accounts/accounts.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EventsModule,
    AccountsModule,
    PostsModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
