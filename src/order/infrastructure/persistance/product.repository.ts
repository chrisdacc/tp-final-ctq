import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from 'src/order/domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class ProductRepositoryTypeOrm
  extends Repository<Product>
  implements ProductRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }
  
  async findAllByisActive(isActive: boolean): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.isActive = :isActive', { isActive });

    return queryBuilder.getMany();
}

  async findById(id: string): Promise<Product | null> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    return queryBuilder.getMany();
  }

  async findByName(name: string): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.name = :name', { name });

    return queryBuilder.getMany();
  }

  async deleteProduct(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
