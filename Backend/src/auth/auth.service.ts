import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInResponse } from "./dto/sign-in-response.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string) {
    try {
      const user = await this.userService.authenticate(username, pass);
      const payload = { id: user.id, username: user.username };
      const token = await this.jwtService.sign(payload);

      const response: SignInResponse = { user, token };
      return response;
    } catch (error) {
      return error;
    }
  }

  // TODO: Handle change password here.
  // async changePassword(username: string, pass: string, newPass: string) {
  //   try {
  //     const user = await this.userService.authenticate(username, pass);
  //   } catch (error) {
  //     return error;
  //   }
  // }
  async changePassword(changePassordDto: ChangePasswordDto) {
    return await this.userService.updatePassword(changePassordDto);
  }
}
