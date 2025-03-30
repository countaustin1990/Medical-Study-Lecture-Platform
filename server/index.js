import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock Database
const users = [
  {
    id: '1',
    email: 'admin@medlecture.com',
    password: bcrypt.hashSync('admin123', 10),
    displayName: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'student@medlecture.com',
    password: bcrypt.hashSync('student123', 10),
    displayName: 'Student User',
    role: 'student'
  },
  {
    id: '3',
    email: 'instructor@medlecture.com',
    password: bcrypt.hashSync('instructor123', 10),
    displayName: 'Instructor User',
    role: 'instructor'
  }
];

const enrollments = [
  {
    id: '1',
    userId: '2',
    courseId: '1',
    enrollmentDate: new Date(),
    completedModules: ['m1'],
    isCompleted: false
  },
  {
    id: '2',
    userId: '2',
    courseId: '2',
    enrollmentDate: new Date(),
    completedModules: [],
    isCompleted: false
  }
];

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    
    // Attach user to request
    req.user = decoded;
    next();
  });
};

// Role-based authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    // Check if email already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: bcrypt.hashSync(password, 10),
      displayName,
      role: 'student'
    };
    
    users.push(newUser);
    
    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, displayName: newUser.displayName, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    // Send response without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(user => user.email === email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    // Send response without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(user => user.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// Course Routes
app.get('/api/courses', (req, res) => {
  // This would fetch from your database in a real application
  // For now, we'll use a simulated response
  res.json({
    courses: [
      {
        id: '1',
        title: 'Human Anatomy Fundamentals',
        description: 'Comprehensive overview of human body systems and structures',
        imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8',
        price: 199,
        category: 'Anatomy',
        instructor: 'Dr. Sarah Johnson',
        duration: '12 weeks',
        level: 'Beginner',
        modules: [
          {
            id: 'm1',
            title: 'Introduction to Anatomy',
            description: 'Overview of anatomical terminology and body planes',
            content: 'Detailed content about anatomical terminology'
          }
        ]
      },
      {
        id: '2',
        title: 'Advanced Cardiovascular Physiology',
        description: 'In-depth exploration of heart function and circulatory system',
        imageUrl: 'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74',
        price: 249,
        category: 'Physiology',
        instructor: 'Dr. Michael Chen',
        duration: '10 weeks',
        level: 'Advanced',
        modules: [
          {
            id: 'm1',
            title: 'Cardiac Cycle',
            description: 'Understanding the mechanical and electrical events in a heartbeat',
            content: 'Detailed content about cardiac cycle'
          }
        ]
      },
      {
        id: '3',
        title: 'Surgical Techniques & Procedures',
        description: 'Essential skills and knowledge for modern surgical practice',
        imageUrl: 'https://images.unsplash.com/photo-1486825586573-7131f7991bdd',
        price: 299,
        category: 'Surgery',
        instructor: 'Dr. Robert Torres',
        duration: '16 weeks',
        level: 'Intermediate',
        modules: [
          {
            id: 'm1',
            title: 'Aseptic Techniques',
            description: 'Principles and practices of maintaining sterility in the operating room',
            content: 'Detailed content about aseptic techniques'
          }
        ]
      }
    ]
  });
});

app.get('/api/courses/:id', (req, res) => {
  // In a real app, you would fetch from database
  // For now we'll just return a static response
  const courseId = req.params.id;
  
  // Simulated course data
  const course = {
    id: courseId,
    title: courseId === '1' ? 'Human Anatomy Fundamentals' : 'Advanced Cardiovascular Physiology',
    description: 'Comprehensive overview of human body systems and structures',
    imageUrl: courseId === '1' 
      ? 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8'
      : 'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74',
    price: courseId === '1' ? 199 : 249,
    category: courseId === '1' ? 'Anatomy' : 'Physiology',
    instructor: courseId === '1' ? 'Dr. Sarah Johnson' : 'Dr. Michael Chen',
    duration: courseId === '1' ? '12 weeks' : '10 weeks',
    level: courseId === '1' ? 'Beginner' : 'Advanced',
    modules: [
      {
        id: 'm1',
        title: courseId === '1' ? 'Introduction to Anatomy' : 'Cardiac Cycle',
        description: courseId === '1' 
          ? 'Overview of anatomical terminology and body planes'
          : 'Understanding the mechanical and electrical events in a heartbeat',
        content: courseId === '1' 
          ? 'Detailed content about anatomical terminology'
          : 'Detailed content about cardiac cycle'
      }
    ]
  };
  
  res.json({ course });
});

// Protected Routes - Student Dashboard
app.get('/api/dashboard', authenticateToken, (req, res) => {
  // Get enrollments for the logged-in user
  const userEnrollments = enrollments.filter(enroll => enroll.userId === req.user.id);
  
  res.json({ 
    enrollments: userEnrollments,
    user: req.user
  });
});

// Checkout/Payment Routes
app.post('/api/checkout', authenticateToken, (req, res) => {
  const { courseId } = req.body;
  
  // In a real app, this would create a Stripe session
  // For demo, just simulate a successful enrollment
  
  // Check if user is already enrolled
  const existingEnrollment = enrollments.find(
    e => e.userId === req.user.id && e.courseId === courseId
  );
  
  if (existingEnrollment) {
    return res.status(400).json({ message: 'Already enrolled in this course' });
  }
  
  // Create new enrollment
  const newEnrollment = {
    id: (enrollments.length + 1).toString(),
    userId: req.user.id,
    courseId,
    enrollmentDate: new Date(),
    completedModules: [],
    isCompleted: false
  };
  
  enrollments.push(newEnrollment);
  
  res.json({ 
    success: true, 
    message: 'Enrollment successful',
    redirect: `/courses/${courseId}/learn`
  });
});

// Admin Routes
app.get('/api/admin/users', authenticateToken, authorize(['admin']), (req, res) => {
  // Return all users without passwords
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({ users: usersWithoutPasswords });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
 