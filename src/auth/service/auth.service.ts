import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Auth } from '../dto/auth.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async doesAdminExist() {
    try {
      const foundAdmin = await this.userRepository.findOneBy({
        username: 'admin1202',
      });

      if (!foundAdmin) {
        const createdAdmin = this.userRepository.create({
          username: 'admin1202',
          password: '9@Lz$GvYp1Qs',
        });

        await this.userRepository.save(createdAdmin);
      }
    } catch (error) {
      console.log(error.message);

      throw error;
    }
  }

  async login({ password, username }: Auth) {
    try {
      const foundUser = await this.userRepository.findOneBy({ username });

      if (!foundUser) {
        throw new UnauthorizedException('username or password is incorrect');
      }

      if (password.toString().length < 8 || password.toString().length > 20) {
        throw new BadRequestException(
          'length of password should be more than 8 or less than 20',
        );
      }

      const unhashedPassword = foundUser.validPassword(password);

      if (!unhashedPassword) {
        throw new UnauthorizedException('username or password is incorrect');
      }

      const payload = { id: foundUser.id, username: foundUser.username };

      const token = await this.jwtService.signAsync(payload);

      return {
        message: 'OK',
        data: { token },
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
