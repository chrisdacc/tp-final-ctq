import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Order } from './order.entity';

export interface CreateProduct {
    isActive?: boolean;
    name: string;
    price: number;
    stock?: number;
    description: string;
}

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ type: 'bool', default: false })
    isActive: boolean;

    @Column()
    description: string;

    constructor(createProduct?: CreateProduct) {
        if (createProduct) {
            this.verifyProductIsValid(createProduct);

            this.name = createProduct.name;
            this.price = createProduct.price;
            this.description = createProduct.description;
            this.stock = createProduct.stock ?? 0;
            this.isActive = createProduct.isActive ?? false;
        }
    }

    private verifyProductIsValid(createProduct: CreateProduct): void {
        if (!createProduct.name || !createProduct.price || !createProduct.description) {
            throw new BadRequestException('Missing required fields');
        }
    }

    canDelete(): void {
       // if (this.order) {
            throw new Error('Cannot delete the product');
       // }
    }

    modify(createProduct: CreateProduct): void {
        if (createProduct) {
            this.verifyProductIsValid(createProduct);

            this.name = createProduct.name;
            this.price = createProduct.price;
            this.description = createProduct.description;
            this.stock = createProduct.stock ?? 0;
            this.isActive = createProduct.isActive ?? false;
        }
    }

    decrementQuantity(quantity: number) {
        if( this.stock === 0 ){
            throw new Error('Stock of '+ this.name +' is null');
        }
        if( (this.stock - quantity) <= 0){
            this.stock = 0;
            
        }
      }
}
