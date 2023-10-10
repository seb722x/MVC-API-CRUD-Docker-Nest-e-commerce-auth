import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseService } from './purchase.service';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/models/user.entity';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createPurchaseDto: any,@GetUser() user: User) {
    return this.purchaseService.purchase(user.id,createPurchaseDto);
    console.log({createPurchaseDto,user});
    
  }

  @Get()
  findAll(  ) {
    return this.purchaseService.findAll();
  }

  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
    return this.purchaseService.findOne( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto,
    @GetUser() user: User,
  ) {
    return this.purchaseService.update( id, updateProductDto );
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.purchaseService.remove( id );
  }


}


