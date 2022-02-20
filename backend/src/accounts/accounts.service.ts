import {Inject, Injectable} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import {ethers} from "ethers";
import {User} from "./entities/account.entity";
import {Repository} from "typeorm";


export class LoginService {

  constructor(
      private readonly usersService: UsersService,
  ) {}

  getAddressFromSignature(message: string, signature: string): string {
    const msgHash = ethers.utils.keccak256(message) // as specified by ECDSA
    const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
    return ethers.utils.recoverAddress(msgBytes, signature);
  }

  async login(loginDto: LoginDto): User | null {
    const address = this.getAddressFromSignature(loginDto.message, loginDto.signature);
    if(address.toLowerCase() !== loginDto.address.toLowerCase()) {
      return null;
    }

    // Find the user
    let user = await this.usersService.findByAddress(loginDto.address);

    // If the user doesn't exist: create it
    if(!user) {
      // Insert
      user = new User()
      user.address = loginDto.address;
      await this.usersService.insert(user);
    }

    return user
  }
}

@Injectable()
export class UsersService {

  constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
  ) {}

  async findByAddress(address: string): Promise<User | null> {
    return this.userRepository.findOne({ where:
          { address }
    });
  }

  async insert(user: User): Promise<void> {
    await this.userRepository.insert(user);
  }

}
