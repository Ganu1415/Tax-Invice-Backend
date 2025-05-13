import Bill from "../models/Billing.js";
import Item from "../models/itemModel.js";
import moment from "moment"; // For date/time

// Create Bill
export const createBill = async (req, res) => {
  try {
    const { customerName, customerMobile, items, paymentType } = req.body;

    if (!customerName || !customerMobile || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // let totalAmount = 0;
    // let updatedItems = [];

    // for (const item of items) {
    //   const dbItem = await Item.findById(item.itemId);

    //   if (!dbItem) {
    //     return res.status(404).json({ message: "Item not found!" });
    //   }

    //   if (dbItem.quantity < item.quantity) {
    //     return res
    //       .status(400)
    //       .json({ message: `Insufficient stock for ${dbItem.name}` });
    //   }

    //   // Update stock
    //   dbItem.quantity -= item.quantity;
    //   await dbItem.save();

    //   totalAmount += dbItem.rate * item.quantity;

    //   updatedItems.push({
    //     itemId: dbItem._id,
    //     quantity: item.quantity,
    //   });
    // }
    let totalAmount = 0;
    let updatedItems = [];

    for (const item of items) {
      const dbItem = await Item.findById(item.itemId);

      if (!dbItem) {
        return res.status(404).json({ message: "Item not found!" });
      }

      if (dbItem.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${dbItem.name}` });
      }

      // Update stock
      dbItem.quantity -= item.quantity;
      await dbItem.save();

      const itemTotal = dbItem.rate * item.quantity;
      totalAmount += itemTotal;

      updatedItems.push({
        itemId: dbItem._id,
        name: dbItem.name,
        rate: dbItem.rate,
        quantity: item.quantity,
        total: itemTotal,
        productId: dbItem.productId,
        companyId: dbItem.companyId,
      });
    }

    const gstAmount = totalAmount * 0.12; // 12% GST
    const finalAmount = totalAmount + gstAmount;
    const balance = paymentType === "udhari" ? finalAmount : 0;

    const newBill = new Bill({
      customerName,
      customerMobile,
      items: updatedItems,
      paymentType,
      totalAmount: finalAmount,
      gstAmount,
      balance,
      date: moment().format("DD/MM/YYYY"),
      time: moment().format("hh:mm:ss A"),
    });

    await newBill.save();

    res
      .status(201)
      .json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all Bills
export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("items.itemId");
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get single Bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("items.itemId");

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get single Bill update by ID
export const updateBill = async (req, res) => {
  const { id } = req.params;
  const { customerName, customerMobile, items, paymentType } = req.body;

  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    bill.customerName = customerName || bill.customerName;
    bill.customerMobile = customerMobile || bill.customerMobile;
    bill.items = items || bill.items;
    bill.paymentType = paymentType || bill.paymentType;

    const updatedBill = await bill.save();
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get single Bill delete by ID
export const deleteBill = async (req, res) => {
  const { id } = req.params;

  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    await bill.deleteOne();
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
