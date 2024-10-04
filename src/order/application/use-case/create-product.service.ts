import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";

export class CreateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface){}

    async execute(createProduct : CreateProduct){
        const product = new Product(createProduct);
        
        return await this.productRepository.save(product);
    }
}