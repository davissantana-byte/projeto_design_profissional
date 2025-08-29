const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/app-denuncias', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 MongoDB conectado com sucesso');
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação em caso de erro na conexão
  }
};

module.exports = connectDB;