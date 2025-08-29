const express = require("express");
const router = express.Router();
const { createReport, getReports, getReportById } = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createReport);
router.get("/", authMiddleware, getReports);
router.get("/:id", authMiddleware, getReportById);

module.exports = router;
