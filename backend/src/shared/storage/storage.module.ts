import { Module, Provider } from '@nestjs/common';
import {
  NFT_STORAGE_CLIENT_TOKEN,
  STORAGE_SERVICE_TOKEN,
} from './storage.tokens';
import { StorageService } from './storage.service';
import { NFTStorage } from 'nft.storage';

const storageServiceProvider: Provider = {
  provide: STORAGE_SERVICE_TOKEN,
  useClass: StorageService,
};

const NFT_STORAGE_CLIENT_API_KEY_ENV = 'NFT_STORAGE_API_KEY';
const nftStorageClientProvider: Provider = {
  provide: NFT_STORAGE_CLIENT_TOKEN,
  useFactory: () => {
    const apiKey = process.env[NFT_STORAGE_CLIENT_API_KEY_ENV];
    return new NFTStorage({ token: apiKey });
  },
};

const providers = [nftStorageClientProvider, storageServiceProvider];
const exportsProviders = [storageServiceProvider];

@Module({ providers: providers, exports: exportsProviders })
export class StorageModule {}
