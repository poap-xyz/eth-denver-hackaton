import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { AccountsModule } from './accounts/accounts.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [EventsModule, AccountsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
