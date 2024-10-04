import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import { Product } from 'src/order/domain/entity/product.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class OrderRepositoryTypeOrm
  extends Repository<Order>
  implements OrderRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Order, datasource.createEntityManager());
  }

  async findOrdersContainProduct(product: Product): Promise<Order[]> {
    const queryBuilder = this.createQueryBuilder('order')
      .innerJoinAndSelect('order.items', 'orderItem')
      .innerJoinAndSelect('orderItem.product', 'product')
      .where('product.id = :productId', { productId: product.id });

    return queryBuilder.getMany();
  }

  async findById(id: string): Promise<Order | null> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Order[]> {
    const queryBuilder = this.createQueryBuilder('order');

    return queryBuilder.getMany();
  }

  async findByCustomerName(customerName: string): Promise<Order[]> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.customerName = :customerName', { customerName });

    return queryBuilder.getMany();
  }

  async deleteOrder(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('order');

    queryBuilder.where('order.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
