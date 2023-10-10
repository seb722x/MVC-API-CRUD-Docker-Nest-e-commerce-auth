import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateProductDto, CreateProductDto} from './dto/index.dto';
import { User } from 'src/models/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CommonCrudService } from 'src/common/commonCrud.service';



@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly dataSource: DataSource,

    private CRUDService:CommonCrudService<Product>

  ) {}
  
  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      return await this.CRUDService.createBuilder(queryBuilder, createProductDto);
    } catch (error) {
      this.handleDBExceptions(error)
    }
   

  }
  
 
  async findAll(paginationDto: PaginationDto) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      return await this.CRUDService.findAllBuilder(queryBuilder, paginationDto);
    } catch (error) {
      this.handleDBExceptions(error)
    }
    

  }



  async findOne(term: string) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      const product = await this.CRUDService.findOneBuilder(queryBuilder, term);
      if (!product) {
        throw new NotFoundException(`Producto con término '${term}' no encontrado.`);
      }
      return product;
  
    } catch (error) {
      this.handleDBExceptions(error)
    }
   

    
  }
  

  async update( id: string, updateProductDto: UpdateProductDto, user: User ) {

      try {
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        const updatedProduct = await this.CRUDService.updateWithQueryBuilder(queryBuilder, id, updateProductDto);
        return updatedProduct;
      } catch (error) {
        this.handleDBExceptions(error)
      }
  }


  async remove(id: string) {
    try {
      const exist= await this.exists(id);
      if(!exist)  return 
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      return await this.CRUDService.removeWithQueryBuilder(queryBuilder, id);

    } catch (error) {
      this.handleDBExceptions(error)
    }
  }


 
  async deleteAllProducts() {
    const queryBuilder  = this.productRepository.createQueryBuilder('product');
    await this.CRUDService.deleteAllWithQueryBuilder(queryBuilder);
  }




    private handleDBExceptions( error: any ) {

      if ( error.code === '23505' )
        throw new BadRequestException(error.detail);
      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }


    async exists(id: string): Promise<boolean> {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      queryBuilder.where('product.id = :id', { id });
      
      const count = await queryBuilder.getCount();
  
      return count > 0;
    }

}

