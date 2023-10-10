import {
  Controller,
  Get,
  Post,
  Redirect,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  Res,
  Query,
  Param,
  Patch,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';
import { LoginUserDto } from './dto/login-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto , @Res({ passthrough: true }) response) {
    const { token } = await this.authService.login(loginUserDto);
    response.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
    return this.authService.login( loginUserDto );
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.authService.findAll( paginationDto );
  }

  
  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.authService.findOne( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateUser: UpdateUser,
    @GetUser() user: User,
  ) {
    return this.authService.updateUser( id, updateUser, );
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.authService.deleteUser( id );
  }


  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

 

  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
    request.session.user = null;
  }

  
  @Get('/private3')
  @Auth( ValidRoles.admin )
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }
}


