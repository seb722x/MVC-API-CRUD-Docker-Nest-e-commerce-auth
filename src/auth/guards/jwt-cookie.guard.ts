import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token']; 

    if (!token) {
      return false; 
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken; 
      return true;
    } catch (error) {
      return false; 
    }
  }
}