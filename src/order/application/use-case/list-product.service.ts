import { CreateProduct, Product } from "src/order/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/order/domain/port/persistance/product.repository.interface";

export class ListProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface){}

    async execute(isActive : boolean) : Promise<Product[]>{
        const products = await this.productRepository.findAll();
        
        if(!products){
            throw new Error('No products found');
        }
        const filteredProducts = products.filter(product => product.isActive === isActive);
        if(filteredProducts.length === 0){
            throw new Error('No products for the filtered flag isActive = '+ isActive );
        }

        return filteredProducts;
    }
}