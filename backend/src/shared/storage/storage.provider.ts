import { StorageService } from './storage.service';
import { Provider } from '@nestjs/common';
import { NFTStorage } from 'nft.storage';

const NFT_STORAGE_API_KEY_ENV = 'NFT_STORAGE_API_KEY';
const nftStorageClientProvider: Provider = {
  provide: 'NFT_STORAGE_CLIENT_TOKEN',
  useFactory: () => {
    const apiKey = process.env[NFT_STORAGE_API_KEY_ENV];
    return new NFTStorage({ token: apiKey });
  },
};

const storageServiceProvider = {
  provide: 'STORAGE_SERVICE',
  useClass: StorageService,
  inject: ['NFT_STORAGE_CLIENT_TOKEN'],
};

export const storageProviders = [
  nftStorageClientProvider,
  storageServiceProvider,
];
