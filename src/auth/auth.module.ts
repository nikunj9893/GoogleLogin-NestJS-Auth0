import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';

import { UsersModule } from '../users/user.module';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
