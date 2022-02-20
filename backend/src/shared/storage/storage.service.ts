import { StorageInterface } from '../contracts/storage.interface';
import { Inject, Injectable } from '@nestjs/common';
import { NFT_STORAGE_CLIENT_TOKEN } from './storage.tokens';
import { NFTStorage, File } from 'nft.storage';
import { StoreDataDto } from './dto/store-data.dto';

@Injectable()
export class StorageService implements StorageInterface {
  constructor(
    @Inject(NFT_STORAGE_CLIENT_TOKEN)
    private readonly nftStorageClient: NFTStorage,
  ) {}

  async store(data: StoreDataDto): Promise<string> {
    const file = new File([data.buffer], data.filename, { type: 'image/png' });
    const metadata = await this.nftStorageClient.store({
      name: data.name,
      description: data.description,
      image: file,
    });
    return metadata.url;
  }
}
