import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Render, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/models/user.entity';
import { Product } from 'src/models/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateProductDto, CreateProductDto } from './dto/index.dto';


@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}



  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Product was created', type: Product  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user );
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.productsService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.productsService.findOne( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update( id, updateProductDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove( id );
  }


}
















