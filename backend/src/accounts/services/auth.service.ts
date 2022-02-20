import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ethers } from 'ethers';
import { User } from '../entities/user.entity';;
import { Buffer } from 'buffer';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  getAddressFromSignature(message: string, signature: string): string {
    const padded =
      '\x19Ethereum Signed Message:\n' + message.length.toString() + message;
    const msgHash = ethers.utils.keccak256(Buffer.from(padded)); // as specified by ECDSA
    const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
    return ethers.utils.recoverAddress(msgBytes, signature);
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const address = this.getAddressFromSignature(
      loginDto.message,
      loginDto.signature,
    );
    if (address.toLowerCase() !== loginDto.address.toLowerCase()) {
      return null;
    }

    // Find the user
    let user = await this.usersService.findByAddress(loginDto.address);
    // If the user doesn't exist: create it
    if (!user) {
      user = await this.usersService.create(loginDto.address);
    }

    return user;
  }

  async login(user: User) {
    const payload = { address: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
