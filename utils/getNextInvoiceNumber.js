// utils/getNextInvoiceNumber.js
import Counter from "../models/Counter.js";

export const getNextInvoiceNumber = async () => {
  const result = await Counter.findOneAndUpdate(
    { name: "invoiceNumber" },
    { $inc: { value: 1 } },
    { new: true, upsert: true } // Create if doesn't exist
  );

  return result.value;
};
