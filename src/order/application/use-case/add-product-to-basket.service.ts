import { OrderItem } from "src/order/domain/entity/order-item.entity";
import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";

export class AddProductService {
    constructor(
        private readonly productRepository: ProductRepositoryInterface,
        private readonly orderRepository: OrderRepositoryInterface
    ){}

    async execute(orderId: string, productId: string, quantity: number){
        const product = await this.productRepository.findById(productId);
        const order = await this.orderRepository.findById(orderId);
        order.canAddItems();
        product.decrementQuantity(quantity);
        order.addProducts(product, quantity);
        
        return await this.productRepository.save(product);
    }
}