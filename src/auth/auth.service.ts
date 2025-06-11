import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    const error = new UnauthorizedException('Usuário ou senha inválido.');
    if (!user) {
      throw error;
    }

    const isPassValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPassValid) {
      throw error;
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    user.forceLogout = false;
    await this.userService.save(user);

    return { accessToken };
  }
}
