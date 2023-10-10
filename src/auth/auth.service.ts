import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CommonCrudService } from 'src/common/commonCrud.service';
import { validate as isUUID } from 'uuid';
import { UpdateUser } from './dto/update-user.dto';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private CRUDService:CommonCrudService<User>

  ) {}

 
  async create( createUserDto:CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
        
      });

      await this.usersRepository.save( user )
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id, role: user.role })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login( loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, role:true } 
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
       this.getJwtToken({ id: user.id,role:user.role })
      
      
    return {
      ...user,
      token: this.getJwtToken({ id: user.id, role:user.role})
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    return await this.CRUDService.findAllBuilder(queryBuilder, paginationDto);

  }

  async findOne(term: string) {
    
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    const product = await this.CRUDService.findOneBuilder(queryBuilder, term);

    if (!product) {
      throw new NotFoundException(`Producto con término '${term}' no encontrado.`);
    }


    return product;
  }


  async updateUserBalance(userId: string, newBalance: number): Promise<void> {
    const userExists = await this.exists(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ balance: newBalance })
      .where('id = :userId', { userId })
      .execute();
  }


  async updateUser(userId: string, updatedUser: Partial<User>): Promise<User> {
    const userExists = await this.exists(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updatedUser)
      .where('id = :userId', { userId })
      .execute();

    // Obtener el usuario actualizado
    const updatedUserData = await this.usersRepository.findOneBy({id:userId});

    return updatedUserData;
  }


  

  async deleteUser(userId: string): Promise<string> {

    const userExists = await this.exists(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const deleteResult = await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :userId', { userId })
      .execute();

    if (deleteResult.affected === 0) {
      throw new NotFoundException('User could not be eliminated');
    }
    return "user eliminated"
  }



  async exists(id: string): Promise<boolean> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.where('user.id = :id', { id });
    
    const count = await queryBuilder.getCount();

    return count > 0;
  }





  














  


  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id ,  role: user.role})
    };

  }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');

  }


  //findOne(id: number): Promise<User> {
  //  return this.usersRepository.findOneBy({ id: id });
  //}
//
  //findAll(): Promise<User[]> {
  //  return this.usersRepository.find();
  //}
  //updateBalance(id: number, balance: number) {
  //  return this.usersRepository.update(id, { balance: balance });
  //}
//
  //async remove(id: number): Promise<void> {
  //  await this.usersRepository.delete(id);
  //}

 // async update(id: number, updateProduct){
 //   const {name, balance, email, roles} = updateProduct
 //   const user = await this.findOne(+id);
 //   user.setName(name);
 //   user.setEmail(email);
 //   user.setRole(roles);
 //   user.setBalance(balance)
 //   return this.usersRepository.save(user);
//
 // }

  
  

}


