import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";

export class ListProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface){}

    async execute(isActive : boolean) : Promise<Product[]>{
        const products = await this.productRepository.findAllByisActive(isActive);

        if(!products){
            throw new Error('No products found');
        }
        

        return products;
    }
}