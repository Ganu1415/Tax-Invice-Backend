import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const { name, gstNumber } = req.body;

    let company = await Company.findOne({ name });

    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }

    company = await Company.create({ name, gstNumber });

    res.status(201).json({ message: "Company created", company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gstNumber } = req.body;

    const company = await Company.findByIdAndUpdate(
      id,
      { name, gstNumber },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company updated", company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
