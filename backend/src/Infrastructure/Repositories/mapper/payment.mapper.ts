import { PaymentAggregateRoot } from "../../../Domain/Modules/Payment/AgregateRoot/Payment.AgregateRoot";
import { PaymentAmount } from "../../../Domain/Modules/Payment/Value-Object/PaymentAmount.vo";
import { PaymentScheduleModel } from "../../Database/orm/TypeOrm/entity/PaymentSchedual.entity";
import { ReceiptMapper } from "./receipt.mapper";
import { PaymentsResponse } from "../../../Application/DTO/landlord/paymentRespone";
export class PaymentMapper {
  public static toDomain(model: PaymentScheduleModel): PaymentAggregateRoot {
    const amountVO = PaymentAmount.create(model.amount);

    const receiptEntities = (model.receipts || []).map((receiptModel) =>
      ReceiptMapper.toDomain(receiptModel)
    );

    return new PaymentAggregateRoot({
      paymentId: model.scheduleId,
      paymentStatus: model.paymentStatus,
      amount: amountVO,
      dueDate: model.dueDate.toString(),
      leaseId: model.leaseId,
      paymentReceipt: receiptEntities,
    });
  }

  public static toModel(domain: PaymentAggregateRoot): PaymentScheduleModel {
    const model = new PaymentScheduleModel();

    model.scheduleId = domain.getPaymentId();
    model.paymentStatus = domain.getPaymentStatus();
    model.amount = domain.getPaymentAmount();
    model.dueDate = domain.getDueDate();
    model.leaseId = domain.getLeaseId();

    model.receipts = domain
      .getReceipt()
      .map((receiptEntity) => ReceiptMapper.toModel(receiptEntity));

    return model;
  }

  public static toResponse(model: PaymentScheduleModel): PaymentsResponse {
    return {
      paymentId: model.scheduleId,
      paymentStatus: model.paymentStatus,
      amount: model.amount,
      dueDate: model.dueDate,
      leaseId: model.leaseId,
    };
  }
}
