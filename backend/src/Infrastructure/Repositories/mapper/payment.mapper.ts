import { PaymentAggregateRoot } from "../../../Domain/Modules/Payment/AgregateRoot/Payment.AgregateRoot";
import { PaymentAmount } from "../../../Domain/Modules/Payment/Value-Object/PaymentAmount.vo";
import { PaymentScheduleModel } from "../../Database/orm/TypeOrm/entity/PaymentSchedual.entity";
import { ReceiptMapper } from "./receipt.mapper";
import { PaymentsResponse } from "../../../Application/DTO/landlord/paymentRespone";
export class PaymentMapper {
  public static toDomain(model: PaymentScheduleModel): PaymentAggregateRoot {
    const amountVO = PaymentAmount.create(model.amount);

    return new PaymentAggregateRoot({
      paymentId: model.scheduleId,
      paymentStatus: model.paymentStatus,
      amount: amountVO,
      dueDate: model.dueDate.toString(),
      leaseId: model.leaseId,
      paymentReceipt: model.receipt
        ? ReceiptMapper.toDomain(model.receipt)
        : null,
    });
  }

  public static toModel(domain: PaymentAggregateRoot): PaymentScheduleModel {
    const model = new PaymentScheduleModel();

    model.scheduleId = domain.getPaymentId();
    model.paymentStatus = domain.getPaymentStatus();
    model.amount = domain.getPaymentAmount();
    model.dueDate = domain.getDueDate();
    model.leaseId = domain.getLeaseId();

    const receiptEntity = domain.getReceipt();
    model.receipt = receiptEntity ? ReceiptMapper.toModel(receiptEntity) : null;

    return model;
  }

  public static toResponse(model: PaymentScheduleModel): PaymentsResponse {
    return {
      paymentId: model.scheduleId,
      paymentStatus: model.paymentStatus,
      amount: model.amount,
      dueDate: model.dueDate,
      leaseId: model.leaseId,
      verifiedByLandlord: model.receipt?.verifiedByLandlord,
    };
  }
}
