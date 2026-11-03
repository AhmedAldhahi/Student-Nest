import { z } from "zod";

export const UpdateLeaseRequestStatusSchema = z
  .object({
    status: z.enum(["Pending", "Accept", "Reject"]),
  })
  .strict();
