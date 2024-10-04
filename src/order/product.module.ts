import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductController from './infrastructure/presentation/product.controller';
import { Product } from './domain/entity/product.entity';
import { CreateProductService } from './application/use-case/create-product.service';
import { ModifyProductService } from './application/use-case/modify-product.service';
import { DeleteProductService } from './application/use-case/delete-product.service';
import  ProductRepositoryTypeOrm  from 'src/order/infrastructure/persistance/product.repository'; 
import { ProductRepositoryInterface } from './domain/port/persistance/product.repository.interface';
import { EmailService } from './application/use-case/email.service';
import { EmailServiceInterface } from './application/use-case/email.service.interface';
import { OrderRepositoryInterface } from './domain/port/persistance/order.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductRepositoryTypeOrm,
    EmailService,
    {
      provide: CreateProductService,
      useFactory: (productRepository: ProductRepositoryInterface, emailService: EmailServiceInterface) => {
        return new CreateProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm, EmailService],
    },

    {
      provide: ModifyProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ModifyProductService(productRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },

    {
      provide: DeleteProductService,
      useFactory: (productRepository: ProductRepositoryInterface, orderRepository : OrderRepositoryInterface) => {
        return new DeleteProductService(productRepository, orderRepository);
      },
      inject: [ProductRepositoryTypeOrm],
    },
  ],
})
export class ProductModule {}
