import z from "zod";

export const whatsappStatusSchema = z
  .object({
    whatsappStatus: z.boolean("the value must be boolean"),
  })
  .strict();
