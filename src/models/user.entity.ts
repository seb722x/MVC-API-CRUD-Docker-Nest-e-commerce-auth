import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Order } from './order.entity';
import { IsPositive } from 'class-validator';
import { ProductPurchase } from './purchase.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ unique: true })
  email: string;

  @Column('text', {
    select: false
  })
  password: string;

  @Column('text')
  role: string;
  
  @Column()
  @IsPositive()
  balance: number;

 // @OneToMany(() => Order, (order) => order.user)
 // orders: Order[];
 @OneToMany(() => ProductPurchase, (productPurchase) => productPurchase.user,{ cascade: true })
    purchases: ProductPurchase[];

}
