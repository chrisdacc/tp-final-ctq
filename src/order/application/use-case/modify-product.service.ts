import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";

export class ModifyProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface){}

    async execute(id : string, createProduct: CreateProduct){
        const product = await this.productRepository.findById(id);
        if(!product){
            throw new Error('No product found');
        }
        product.modify(createProduct);

        return await this.productRepository.save(product);
    }
}