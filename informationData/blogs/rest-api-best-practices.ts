export default {
  slug: "rest-api-best-practices",
  title: "RESTful API Tasarım Prensipleri",
  excerpt: "Profesyonel ve ölçeklenebilir REST API'ler geliştirmek için best practices.",
  date: "2024-10-05",
  readTime: "8 dk",
  category: "Backend",
  tags: ["REST API", "Backend", "Node.js"],
  content: `
# RESTful API Tasarım Prensipleri

Profesyonel REST API'ler geliştirmek için temel prensipler ve örnekler:

## HTTP Methods Doğru Kullanımı

\`\`\`javascript
// Express.js örneği
const express = require('express');
const router = express.Router();

// GET - Veri okuma
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json({ data: users, count: users.length });
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST - Yeni kayıt oluşturma
router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
});

// PUT - Tüm kaydı güncelleme
router.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// PATCH - Kısmi güncelleme
router.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json({ data: user });
});

// DELETE - Silme
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
\`\`\`

## Response Format Standardı

\`\`\`javascript
// Success response
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe"
  },
  "message": "User created successfully"
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email"
      }
    ]
  }
}

// Pagination
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
\`\`\`

## Status Code'ları Doğru Kullanma

\`\`\`javascript
// 2xx Success
200 // OK - GET, PUT, PATCH başarılı
201 // Created - POST başarılı
204 // No Content - DELETE başarılı

// 4xx Client Errors
400 // Bad Request - Geçersiz istek
401 // Unauthorized - Kimlik doğrulama gerekli
403 // Forbidden - Yetki yok
404 // Not Found - Kaynak bulunamadı
409 // Conflict - Çakışma (duplicate key vb.)
422 // Unprocessable Entity - Validation hatası

// 5xx Server Errors
500 // Internal Server Error - Sunucu hatası
503 // Service Unavailable - Servis kullanılamıyor

// Middleware örneği
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message
      }
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: 'Resource already exists'
      }
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong'
    }
  });
};
\`\`\`

## Versioning

\`\`\`javascript
// URL versioning (Önerilen)
app.use('/api/v1/users', userRoutesV1);
app.use('/api/v2/users', userRoutesV2);

// Header versioning
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});
\`\`\`

## Authentication & Authorization

\`\`\`javascript
// JWT middleware
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    next();
  };
};

// Kullanım
router.get('/admin/users',
  authenticate,
  authorize('admin'),
  getUsers
);
\`\`\`

## Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Max 100 request
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`

## Query Parameters

\`\`\`javascript
// Filtering, sorting, pagination
router.get('/products', async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    category,
    minPrice,
    maxPrice,
    search
  } = req.query;

  // Build query
  let query = {};

  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }
  if (search) {
    query.$text = { $search: search };
  }

  const products = await Product
    .find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Product.countDocuments(query);

  res.json({
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

// Örnek istek:
// GET /api/products?category=electronics&minPrice=100&maxPrice=500&sort=-price&page=2&limit=20
\`\`\`

## Input Validation

\`\`\`javascript
const { body, validationResult } = require('express-validator');

router.post('/users',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  }
);
\`\`\`

## CORS Configuration

\`\`\`javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
\`\`\`

## Best Practices Özet

1. **Consistent naming** - Endpoint'leri tutarlı adlandırın
2. **Use nouns, not verbs** - \`/getUsers\` değil \`/users\`
3. **Plural resources** - \`/user\` değil \`/users\`
4. **Proper status codes** - HTTP status code'ları doğru kullanın
5. **Versioning** - API versiyonlama yapın
6. **Security** - Authentication, authorization, rate limiting
7. **Documentation** - Swagger/OpenAPI kullanın
8. **Error handling** - Consistent error response format
9. **Validation** - Input validation her zaman yapın
10. **Testing** - Unit ve integration testleri yazın

\`\`\`bash
# API Documentation with Swagger
npm install swagger-ui-express swagger-jsdoc
\`\`\`

Profesyonel REST API'ler bu prensipleri takip eder!
  `
};
