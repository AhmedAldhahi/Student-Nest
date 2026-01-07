import { z } from "zod";
import { PaymentStatus } from "../../../../Domain/Shared/Enum/PaymentStatus.enum";

export const UpdatePaymentStatus = z
  .object({
    status: z.enum(PaymentStatus),
  })
  .strict();
