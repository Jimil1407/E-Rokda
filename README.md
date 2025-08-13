# 💰 E-Rokda - Digital Payment Platform

A modern, secure digital payment application built with React, Node.js, and MongoDB. Send money instantly to friends and family with a beautiful, mobile-optimized interface.

![E-Rokda Logo](frontend/public/erokda-logo.svg)

## 🚀 Features

### **Core Payment Features**
- ✅ **Instant Money Transfers** - Send money to anyone instantly
- ✅ **User Authentication** - Secure signup and login system
- ✅ **Balance Management** - Real-time balance tracking
- ✅ **User Search** - Find users by name to send money
- ✅ **Transaction History** - View all past transfers
- ✅ **Profile Management** - Update personal information

### **Security Features**
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔒 **Password Encryption** - Bcrypt password hashing
- 🛡️ **Input Validation** - Zod schema validation
- 🔍 **Error Handling** - Comprehensive error management

### **UI/UX Features**
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎨 **Modern UI** - Clean, professional interface
- 🌙 **Dark Theme** - Easy on the eyes
- ⚡ **Fast Performance** - Optimized for speed
- 🎯 **Intuitive Navigation** - User-friendly experience

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

### **Deployment**
- **Render** - Backend hosting
- **Docker** - Containerization
- **MongoDB Atlas** - Cloud database

## 📦 Installation

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/paytm-project.git
cd paytm-project
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=3000
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:3000
```

### **4. Start Development Servers**

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🏗️ Project Structure

```
paytm-project/
├── backend/
│   ├── index.js              # Main server file
│   ├── middleware/
│   │   └── verify.js         # JWT verification middleware
│   ├── models/
│   │   ├── balance.js        # Balance model
│   │   └── user.js           # User model
│   ├── routes/
│   │   ├── account.js        # Account routes (balance, transfer)
│   │   ├── index.js          # Root routes
│   │   └── user.js           # User routes (signup, signin, profile)
│   └── schemas/
│       ├── balance.js        # Balance validation schema
│       ├── db.js             # Database connection
│       └── userschema.js     # User validation schema
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── balance.jsx           # Balance display component
│   │   │   ├── findusers.jsx         # User search component
│   │   │   ├── navbar.jsx            # Navigation component
│   │   │   └── sendmoneymodal.jsx    # Send money modal
│   │   ├── pages/
│   │   │   ├── dashboard.jsx         # Main dashboard
│   │   │   ├── landing.jsx           # Landing page
│   │   │   ├── profile.jsx           # User profile
│   │   │   ├── sendmoney.jsx         # Send money page
│   │   │   ├── signin.jsx            # Sign in page
│   │   │   └── signup.jsx            # Sign up page
│   │   ├── config/
│   │   │   └── api.js                # API configuration
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # App entry point
│   ├── public/
│   │   └── erokda-logo.svg           # App logo
│   └── index.html                    # HTML template
├── Dockerfile                        # Docker configuration
├── .dockerignore                     # Docker ignore file
└── README.md                         # This file
```

## 🔧 API Endpoints

### **Authentication**
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login

### **User Management**
- `GET /api/v1/users/getAllUsers` - Get all users (with search)
- `PUT /api/v1/users/update` - Update user profile

### **Account Operations**
- `GET /api/v1/account/getBalance` - Get user balance
- `POST /api/v1/account/transfer` - Send money to another user

## 🚀 Deployment

### **Backend Deployment (Render)**

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Set build command: `docker build -t erokda-backend .`
   - Set start command: `docker run -p $PORT:3000 erokda-backend`

3. **Environment Variables**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - `production`

### **Frontend Deployment (Vercel/Netlify)**

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

## 📱 Mobile Optimization

The application is fully optimized for mobile devices with:

- **Responsive Design** - Works on all screen sizes
- **Touch-Friendly** - Optimized for touch interactions
- **Fast Loading** - Optimized performance
- **Mobile Navigation** - Simplified mobile menu
- **Readable Text** - Appropriate font sizes for mobile

## 🔐 Security Features

- **JWT Authentication** - Secure token-based sessions
- **Password Hashing** - Bcrypt encryption
- **Input Validation** - Zod schema validation
- **CORS Protection** - Cross-origin security
- **Error Handling** - Secure error responses

## 🧪 Testing

### **Manual Testing**
1. **User Registration** - Create a new account
2. **User Login** - Sign in with credentials
3. **Balance Check** - View account balance
4. **Send Money** - Transfer money to another user
5. **User Search** - Find users by name
6. **Profile Update** - Modify personal information

### **API Testing**
Use tools like Postman or curl to test API endpoints:

```bash
# Test signup
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

# Test signin
curl -X POST http://localhost:3000/api/v1/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Custom design with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose

## 🆘 Support

If you encounter any issues:

1. **Check the documentation** - This README file
2. **Search existing issues** - GitHub issues
3. **Create a new issue** - With detailed description
4. **Contact support** - [Your Email]

## 🎯 Roadmap

### **Planned Features**
- [ ] **UPI Integration** - Connect with Indian banks
- [ ] **QR Code Payments** - Scan and pay
- [ ] **Transaction History** - Detailed transaction logs
- [ ] **Push Notifications** - Real-time updates
- [ ] **Multi-Currency Support** - International payments
- [ ] **Business Accounts** - Separate business features
- [ ] **Analytics Dashboard** - Spending insights
- [ ] **Recurring Payments** - Scheduled transfers

### **Technical Improvements**
- [ ] **Unit Tests** - Jest testing framework
- [ ] **E2E Tests** - Cypress testing
- [ ] **Performance Optimization** - Code splitting
- [ ] **PWA Support** - Progressive Web App
- [ ] **Offline Mode** - Basic functionality offline

---

**Made with ❤️ for secure digital payments**

*E-Rokda - The Future of Digital Payments*
