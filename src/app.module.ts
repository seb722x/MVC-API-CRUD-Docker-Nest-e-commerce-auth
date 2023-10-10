import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { User } from './models/user.entity';
import { AuthModule } from './auth/auth.module';
//import { CartModule } from './cart/cart.module';
//import { Item } from './models/item.entity';
//import { Order } from './models/order.entity';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { ProductPurchase } from './models/purchase.entity';
import { PurchaseModule } from './purchase/purchase.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product, User,ProductPurchase ]),
    
    AuthModule,
    //CartModule,
    ProductsModule,
    PurchaseModule,
    
    
  ],
  controllers: [ ],
 
})
export class AppModule {}
