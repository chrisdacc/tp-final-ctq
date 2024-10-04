import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProductService } from 'src/order/application/use-case/create-product.service';
import { CreateProduct, Product } from 'src/order/domain/entity/product.entity';

@Controller('/products')
export default class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateProduct,
  ): Promise<Product> {
    return this.createProductService.execute(createOrderCommand);
  }

}
