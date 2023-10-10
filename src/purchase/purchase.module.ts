import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { PurchaseService } from './purchase.service';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { ProductPurchase } from 'src/models/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports:[AuthModule, ProductsModule, TypeOrmModule.forFeature([ProductPurchase])]
})
export class PurchaseModule {}
