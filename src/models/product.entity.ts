import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
//import { Item } from './item.entity';
import { ProductPurchase } from './purchase.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @Column('float',{
    default: 0
  })
  price: number;

  @Column()
  category:string;

  @Column()
  stock:number

  

@ManyToMany(() => ProductPurchase, (productPurchase) => productPurchase.products)
purchases: ProductPurchase[];
  

  

  //static sumPricesByQuantities(products: Product[], productsInSession): number {
  //  let total = 0;
  //  for (let i = 0; i < products.length; i++) {
  //    total =
  //      total + products[i].getPrice() * productsInSession[products[i].getId()];
  //  }
  //  return total;
  //}
}
