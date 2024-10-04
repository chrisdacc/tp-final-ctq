import { CreateOrderCommand, Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';

export class CreateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(createOrderCommand: CreateOrderCommand): Promise<Order> {
    const order = new Order(createOrderCommand);
    createOrderCommand.items.forEach(orderItem =>{
      const quantity = orderItem.quantity;
      orderItem.product.decrementQuantity(quantity);
    })
      
    
    return await this.orderRepository.save(order);
  }
}
