// ===============================
// ESTRUTURA DO BACKEND (Node.js + Express)
// ===============================

/*
ESTRUTURA DE PASTAS:

backend/
├── src/
│   ├── controllers/
│   │   ├── UserController.js
│   │   ├── ReportController.js
│   │   └── AuthController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── users.routes.js
│   │   ├── reports.routes.js
│   │   └── auth.routes.js
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   └── services/
│       ├── EmailService.js
│       └── NotificationService.js
├── server.js
├── package.json
└── .env

ARQUIVOS PRINCIPAIS:

=== server.js ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/users.routes');
const reportRoutes = require('./src/routes/reports.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

=== src/models/User.js ===
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    anonymousReports: {
      type: Boolean,
      default: true
    },
    emergencyAlerts: {
      type: Boolean,
      default: true
    },
    reportUpdates: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

=== src/models/Report.js ===
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return !this.isAnonymous; }
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Violência Física',
      'Violência Psicológica', 
      'Violência Sexual',
      'Violência Patrimonial',
      'Violência Moral',
      'Perseguição/Stalking',
      'Outro'
    ]
  },
  description: {
    type: String,
    required: true
  },
  incidentDate: {
    type: Date
  },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  hasEvidence: {
    type: Boolean,
    default: false
  },
  needsHelp: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pendente', 'Em Análise', 'Encaminhado', 'Concluído'],
    default: 'Pendente'
  },
  protocolNumber: {
    type: String,
    unique: true
  },
  assignedTo: {
    type: String // Autoridade responsável
  }
}, {
  timestamps: true
});

// Generate protocol number before saving
ReportSchema.pre('save', function(next) {
  if (!this.protocolNumber) {
    this.protocolNumber = 'RPT' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Report', ReportSchema);

=== src/controllers/UserController.js ===
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {
  async create(req, res) {
    try {
      const { name, email, password, phone, city } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const user = await User.create({
        name,
        email,
        password,
        phone,
        city
      });

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Remove password from updates (handle separately)
      delete updates.password;

      const user = await User.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json({ message: 'Conta desativada com sucesso' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new UserController();

=== src/controllers/ReportController.js ===
const Report = require('../models/Report');

class ReportController {
  async create(req, res) {
    try {
      const {
        type,
        description,
        incidentDate,
        location,
        isAnonymous,
        hasEvidence,
        needsHelp
      } = req.body;

      const reportData = {
        type,
        description,
        incidentDate,
        location,
        isAnonymous,
        hasEvidence,
        needsHelp
      };

      // Add user ID only if not anonymous
      if (!isAnonymous && req.userId) {
        reportData.userId = req.userId;
      }

      const report = await Report.create(reportData);

      return res.status(201).json({
        message: 'Denúncia registrada com sucesso',
        protocolNumber: report.protocolNumber,
        reportId: report._id
      });
    } catch (error) {
      console.error('Error creating report:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req, res) {
    try {
      const { page = 1, limit = 10, status, type } = req.query;
      const filters = {};

      if (status) filters.status = status;
      if (type) filters.type = type;

      const reports = await Report.find(filters)
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Report.countDocuments(filters);

      return res.json({
        reports,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } catch (error) {
      console.error('Error listing reports:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getUserReports(req, res) {
    try {
      const { userId } = req.params;
      
      const reports = await Report.find({ 
        userId,
        isAnonymous: false
      }).sort({ createdAt: -1 });

      return res.json(reports);
    } catch (error) {
      console.error('Error getting user reports:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, assignedTo } = req.body;

      const report = await Report.findByIdAndUpdate(
        id,
        { status, assignedTo },
        { new: true }
      );

      if (!report) {
        return res.status(404).json({ error: 'Denúncia não encontrada' });
      }

      return res.json(report);
    } catch (error) {
      console.error('Error updating report status:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new ReportController();

=== src/routes/reports.routes.js ===
const express = require('express');
const ReportController = require('../controllers/ReportController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes (anonymous reports)
router.post('/', ReportController.create);

// Protected routes
router.get('/', authMiddleware, ReportController.list);
router.get('/user/:userId', authMiddleware, ReportController.getUserReports);
router.put('/:id/status', authMiddleware, ReportController.updateStatus);

module.exports = router;

=== src/routes/users.routes.js ===
const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', UserController.create);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);

module.exports = router;

=== src/middleware/auth.js ===
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;

DEPENDÊNCIAS NECESSÁRIAS (package.json):
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0"
  }
}

VARIÁVEIS DE AMBIENTE (.env):
PORT=3333
MONGODB_URI=mongodb://localhost:27017/protege_plus
JWT_SECRET=sua_chave_secreta_muito_segura
NODE_ENV=development
*/

export function BackendStructure() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Estrutura do Backend</h1>
      <p className="text-muted-foreground">
        Esta é a estrutura completa do backend Node.js + Express para o aplicativo Flo.
        Visualize este componente no código para ver todos os arquivos e estruturas necessárias.
      </p>
    </div>
  );
}