import Item from "../models/itemModel.js";

// Create Item
export const createItem = async (req, res) => {
  try {
    const { product, name, rate, quantity } = req.body;

    // Check if item already exists under same product
    let item = await Item.findOne({ product, name });

    if (item) {
      // If exists, just update quantity (and rate only for new items later)
      item.quantity += quantity;
      await item.save();
      return res
        .status(200)
        .json({ message: "Item quantity updated successfully", item });
    }

    // New item creation
    item = await Item.create({ product, name, rate, quantity });
    res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items by Product
export const getAllItemsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const items = await Item.find({ product: productId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { rate, quantity } = req.body; // quantity = नवीन quantity किती add करायचं

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // जर नवीन rate दिला असेल तर update कर
    if (rate !== undefined) {
      item.rate = rate;
    }

    // जर नवीन quantity दिली असेल तर existing + new add कर
    if (quantity !== undefined) {
      item.quantity = item.quantity + quantity;
    }

    await item.save();

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
