import { CreatePromotion, Promotion } from "src/order/domain/entity/promotion.entity";
import { PromotionRepositoryInterface } from "src/order/domain/port/persistance/promotion.repository.interface";

export class CreatePromotionService {
    constructor(private readonly promotionRepository: PromotionRepositoryInterface){}

    async execute(createPromotion : CreatePromotion){
        const promotion = new Promotion(createPromotion);
        
        return await this.promotionRepository.save(promotion);
    }
}