import { StorageService } from './storage.service';
import { Provider } from '@nestjs/common';
import { NFTStorage } from 'nft.storage';

const nftStorageClientProvider: Provider = {
  provide: 'NFT_STORAGE_CLIENT_TOKEN',
  useFactory: () => {
    const apiKey = 'API_KEY';
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
