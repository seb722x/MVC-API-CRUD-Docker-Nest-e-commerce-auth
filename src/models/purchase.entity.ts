import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class ProductPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, (product) => product.purchases,{ cascade: true })
  @JoinTable()
  products: Product[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'userId' })
  user: User;
}