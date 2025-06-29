# Crackd Official Website

A modern, professional website for Crackd SAT preparation services with full MongoDB database integration.

## 🚀 Features

- **Modern Design**: Beautiful, responsive design with smooth animations
- **Database Integration**: Full MongoDB integration with Mongoose ODM
- **User Authentication**: JWT-based authentication system
- **Contact Management**: Store and manage contact form submissions
- **Course Management**: Complete course catalog with ratings and reviews
- **User Management**: Admin panel for user management
- **API Endpoints**: RESTful API for all functionality

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VenkatT2026/Cracked-Offical-Website.git
   cd Cracked-Offical-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/crackd_website
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Server Configuration
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## 🗄️ Database Schema

### Users Collection
- **firstName**: String (required)
- **lastName**: String (required)
- **email**: String (required, unique)
- **password**: String (hashed, required)
- **phone**: String (optional)
- **role**: Enum ['student', 'admin', 'instructor']
- **grade**: Enum ['9th', '10th', '11th', '12th', 'college']
- **targetScore**: Number (400-1600)
- **currentScore**: Number (400-1600)
- **isActive**: Boolean
- **preferences**: Object (notifications, theme, etc.)

### Contacts Collection
- **name**: String (required)
- **email**: String (required)
- **message**: String (required)
- **phone**: String (optional)
- **subject**: String (optional)
- **status**: Enum ['new', 'read', 'replied', 'archived']
- **ipAddress**: String
- **userAgent**: String

### Courses Collection
- **title**: String (required)
- **description**: String (required)
- **category**: Enum ['math', 'reading', 'writing', 'comprehensive', 'practice-tests']
- **level**: Enum ['beginner', 'intermediate', 'advanced']
- **duration**: Number (hours)
- **price**: Number
- **instructor**: ObjectId (ref: User)
- **materials**: Array of course materials
- **topics**: Array of topics covered
- **rating**: Object (average, count)
- **enrollmentCount**: Number
- **isPublished**: Boolean
- **isFeatured**: Boolean

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `PATCH /api/users/profile` - Update user profile (authenticated)

### Contacts
- `GET /api/contacts` - Get all contacts (with pagination)
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/:id` - Get specific contact
- `PATCH /api/contacts/:id` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact
- `GET /api/contacts/stats/summary` - Get contact statistics

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create new course (instructor/admin)
- `PATCH /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/rate` - Rate a course
- `GET /api/courses/category/:category` - Get courses by category
- `GET /api/courses/search/query` - Search courses

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/summary` - Get user statistics

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🎨 Frontend Features

- **Responsive Design**: Works on all devices
- **Smooth Animations**: CSS animations and transitions
- **Interactive Forms**: Real-time validation and feedback
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Loading States**: Visual feedback for API calls
- **Error Handling**: User-friendly error messages

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
Make sure to update the `.env` file with production values:
- Use a strong JWT secret
- Set up a production MongoDB instance
- Configure proper CORS settings
- Set NODE_ENV=production

## 📁 Project Structure

```
Crackd-Offical-Website/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── index.js           # Frontend JavaScript
├── server/
│   ├── server.js          # Main server file
│   ├── models/            # MongoDB models
│   │   ├── Contact.js
│   │   ├── User.js
│   │   └── Course.js
│   └── routes/            # API routes
│       ├── contacts.js
│       ├── users.js
│       └── courses.js
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔄 Updates

Stay updated with the latest features and improvements by:

1. Following the repository
2. Checking the releases page
3. Reading the changelog

---

**Built with ❤️ for Crackd SAT Preparation Services** 