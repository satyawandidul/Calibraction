import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './guard/public-routes';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  signIn(@Body() params: SignInDto) {
    return this.authService.signIn(params.username, params.password);
  }

  @Post("changePassword")
  changePassword(@Body() changePassordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePassordDto)
  }
}
