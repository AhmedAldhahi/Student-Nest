import { ReceiptEntity } from "../../../Domain/Modules/Payment/Entities/ReceiptEntities.entity";
import { ReceiptModel } from "../../Database/orm/TypeOrm/entity/Receipt.entity";

export class ReceiptMapper {
  public static toDomain(model: ReceiptModel): ReceiptEntity {
    return new ReceiptEntity({
      receiptId: model.receiptId,
      ReceiptUrl: model.ReceiptUrl,
      verifiedByLandlord: model.verifiedByLandlord,
      scheduleId: model.scheduleId,
      createAt: model.createAt,
    });
  }

  public static toModel(entity: ReceiptEntity): ReceiptModel {
    const model = new ReceiptModel();

    model.receiptId = entity.getReceiptId();
    model.ReceiptUrl = entity.getReceiptUrl();
    model.verifiedByLandlord = entity.getVerifiedByLandlord();
    model.scheduleId = entity.getScheduleId();
    model.createAt = entity.getCreateAt();

    return model;
  }
}
