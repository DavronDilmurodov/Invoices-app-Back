import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Auth } from '../dto/auth.dto';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    status: 200,
    description: 'You have successfully logged in',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Please, provide token',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Invalid token' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: Auth) {
    await this.authService.doesAdminExist();
    return this.authService.login(body);
  }
}
