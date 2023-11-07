import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('please, provide token');
      }

      let decodedToken;

      try {
        decodedToken = await this.jwtService.verifyAsync(token);
      } catch (error) {
        console.log(error.message);
        return false;
      }

      const foundUser = await this.userRepository.findOneBy({
        id: decodedToken.id,
      });

      if (!foundUser) {
        throw new NotFoundException('user not found');
      }

      request.user = foundUser;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
