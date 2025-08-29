const Report = require("../models/reportModel");

exports.createReport = async (req, res) => {
  try {
    const { title, description } = req.body;
    const report = await Report.create({ title, description, user: req.user.id });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar denúncia", error });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar denúncias", error });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate("user", "name email");
    if (!report) return res.status(404).json({ message: "Denúncia não encontrada" });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar denúncia", error });
  }
};
