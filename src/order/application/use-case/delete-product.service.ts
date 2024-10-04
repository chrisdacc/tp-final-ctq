import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";

export class DeleteProductService {
    constructor(
        private readonly productRepository: ProductRepositoryInterface, 
        private readonly orderRepository: OrderRepositoryInterface
    ){}
   

    async execute(id : string){
        const product = this.productRepository.findById(id);
        if(product === null){
            throw new Error('Product not found');
        }
        const orders = this.orderRepository.findAll();
        let isOrdered = false;
        if(orders !== null){
            (await orders).forEach(async order =>{
                isOrdered = isOrdered || order.containsProduct(await product);
            })
        }
        if (isOrdered) {
            throw new Error('Cannot delete product');
        }
        return await this.productRepository.deleteProduct(id);
    }
}