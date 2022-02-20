import { StoreDataDto } from '../storage/dto/store-data.dto';

export interface StorageInterface {
  store(data: StoreDataDto): Promise<string>;
}
