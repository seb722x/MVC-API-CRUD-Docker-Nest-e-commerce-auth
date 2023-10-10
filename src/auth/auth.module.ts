import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtTokenInterceptor } from './interceptors/jwt.interceptor';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtTokenInterceptor
    }
  ],
  imports: [
    ConfigModule,

    CommonModule,

    TypeOrmModule.forFeature([ User ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'2h'
          }
        }
      }
    })
    

  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule, AuthService ]
})
export class AuthModule {}
