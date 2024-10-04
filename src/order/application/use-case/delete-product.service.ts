import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";

export class DeleteProductService {
    constructor(
        private readonly productRepository: ProductRepositoryInterface, 
        private readonly orderRepository: OrderRepositoryInterface
    ){}
   

    async execute(id : string){
        const product = await this.productRepository.findById(id);
        if(product === null){
            throw new Error('Product not found');
        }
        const orders = await this.orderRepository.findOrdersContainProduct(product);
        if ((orders).length !== 0){
            throw new Error('Cannot delete an ordered product');
        }
        return await this.productRepository.deleteProduct(id);
    }
}