const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Rotas
app.use("/api/users", authRoutes);
app.use("/api/reports", reportRoutes);

// Middleware de erro
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
