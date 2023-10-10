import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProductPurchase } from 'src/models/purchase.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';


@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
    private readonly productService: ProductsService,
    private readonly userService: AuthService,
  ) {}

  async purchase(userId: string, productsUUID): Promise<ProductPurchase> {

    const { productIds } = productsUUID;
    

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const products = await Promise.all(productIds.map((productId) => this.productService.findOne(productId)));
    
    const total = products.reduce((total, product) => total + product.price, 0);

    const newPurchase = this.productPurchaseRepository.create({
      user,
      products,
      purchaseDate: new Date(),
      total
    });
    

    const savedPurchase = await this.productPurchaseRepository.save(newPurchase);

    const newBalance = user.balance - total;
    await this.userService.updateUserBalance(userId, newBalance);

    return savedPurchase;
    
  }

  

  async findAll(): Promise<ProductPurchase[]> {
    return this.productPurchaseRepository.find();
  }

  async findOne(id: string): Promise<ProductPurchase> {
    const purchase = await this.productPurchaseRepository.findOneBy({id:id});
    if (!purchase) {
      throw new NotFoundException('Compra no encontrada');
    }
    return purchase;
  }

  async update(id: string, updateData): Promise<ProductPurchase> {

    const purchase = await this.findOne(id);
    purchase.purchaseDate = updateData.purchaseDate || purchase.purchaseDate;
    purchase.total = updateData.total || purchase.total;
  
    return await this.productPurchaseRepository.save(purchase);
  }

  async remove(id: string) {
    const result = await this.productPurchaseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Compra no encontrada');
    }
    return result;
  }
  
}


