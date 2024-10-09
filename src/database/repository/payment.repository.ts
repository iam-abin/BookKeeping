import { ClientSession } from 'mongoose';
import { PaymentDto } from '../../dto/payment.dto';
import { IPayment, PaymentModel } from '../model';

class PaymentRepository {
    async createPayment(paymentData: PaymentDto, session?: ClientSession): Promise<IPayment> {
        const paidData = await PaymentModel.create([paymentData], { session });
        return paidData[0];
    }
}

export const paymentRepository = new PaymentRepository();
