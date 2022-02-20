import { storageProviders } from './storage.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [...storageProviders],
  exports: [...storageProviders],
})
export class StorageModule {}
