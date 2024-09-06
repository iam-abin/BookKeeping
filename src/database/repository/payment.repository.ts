import { PaymentDto } from '../../dto/payment.dto';
import { IPayment, PaymentModel } from '../model';

export class PaymentRepository {
    async pay(paymentData: PaymentDto): Promise<IPayment> {
        const paidData = await PaymentModel.create(paymentData);
        return paidData;
    }
}
