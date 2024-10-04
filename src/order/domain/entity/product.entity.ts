import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { EmailServiceInterface } from '../../application/use-case/email.service.interface';

export interface CreateProduct {
    isActive?: boolean;
    name: string;
    price: number;
    stock?: number;
    description: string;
    emailService: EmailServiceInterface; 
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

    private emailService: EmailServiceInterface; 

    constructor(createProduct?: CreateProduct) {
        if (createProduct) {
            this.verifyProductIsValid(createProduct);

            this.name = createProduct.name;
            this.price = createProduct.price;
            this.description = createProduct.description;
            this.stock = createProduct.stock ?? 0;
            this.isActive = createProduct.isActive ?? false;
            this.emailService = createProduct.emailService; 
        }
    }

    private verifyProductIsValid(createProduct: CreateProduct): void {
        if (!createProduct.name || !createProduct.price || !createProduct.description) {
            throw new BadRequestException('Missing required fields');
        }
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
        if (this.stock === 0) {
            throw new Error('Stock of ' + this.name + ' is null');
        }
        if ((this.stock - quantity) <= 0) {
            this.stock = 0;

            this.notifyAdmin();
        } else {
            this.stock -= quantity; 
        }
    }

    private async notifyAdmin() {
        const adminEmail = 'admin@test.fr';
        const subject = 'Stock Alert: ' + this.name;
        const body = `The stock for ${this.name} has reached zero. Please restock.`;

        try {
            await this.emailService.sendEmail(adminEmail, subject, body);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
