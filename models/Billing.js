import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true, // avoid duplicates
    },
    // jama: {
    //   type: Number,
    //   default: 0,
    // }, // balance update
    customerName: { type: String, required: true },
    customerMobile: { type: String, required: true },
    paymentType: { type: String, enum: ["cash", "udhari"], required: true },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: { type: String, required: true },
        rate: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      },
      // {
      //   itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      //   quantity: { type: Number, required: true },
      // },
    ],
    totalAmount: { type: Number, required: true },
    gstAmount: { type: Number, required: true, default: 0 }, // optional
    balance: { type: Number, required: true, default: 0 }, // optional
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;

// import mongoose from "mongoose";

// const billingSchema = new mongoose.Schema(
//   {
//     customerName: {
//       type: String,
//       required: true,
//     },
//     customerMobile: {
//       type: String,
//       required: true,
//     },
//     items: [
//       {
//         itemId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Item",
//           required: true,
//         },
//         rate: {
//           type: Number,
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         total: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     paymentType: { type: String, enum: ["cash", "udhari"], required: true },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     gst: {
//       type: Number,
//       required: true,
//     },
//     balance: {
//       type: Number,
//       default: 0,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Billing = mongoose.model("Billing", billingSchema);
// export default Billing;
