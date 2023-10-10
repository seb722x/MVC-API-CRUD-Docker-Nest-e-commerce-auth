import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ ProductsController],
  providers:[ProductsService],
  imports:[
    AuthModule,
    CommonModule,
    
    TypeOrmModule.forFeature([Product])
  ],
  exports: [
    ProductsService,
    TypeOrmModule,
    CommonModule
  ]
})
export class ProductsModule {}
