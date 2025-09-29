# 🚀 NTI Portfolio - Full Stack Portfolio with CMS

A modern, responsive portfolio website with a comprehensive Content Management System (CMS) built with Angular and Node.js. This project showcases professional web development skills with a clean, maintainable architecture and modern UI/UX design.


## ✨ Features

### 🎨 Frontend (Client)
- **Modern Angular 20** with TypeScript
- **Responsive Design** with Tailwind CSS 4.x
- **Native Control Flow** (@if, @for) for better performance
- **Reactive Forms** with comprehensive validation
- **Swiper.js** integration for interactive carousels
- **Component-based Architecture** for maintainability
- **Signal-based State Management** for reactive UI updates

### 🛠️ Backend (Server)
- **RESTful API** built with Express.js
- **MongoDB** with Mongoose ODM
- **File Upload** handling with Multer
- **CORS** enabled for cross-origin requests
- **Morgan** logging for development
- **Slugify** for SEO-friendly URLs
- **Environment Configuration** with dotenv

### 📊 Content Management System
- **Dashboard Interface** for easy content management
- **Project Management** - Create, edit, delete portfolio projects
- **Category Management** - Organize projects by categories
- **Team Management** - Manage team members and their information
- **Testimonials** - Customer reviews and feedback management
- **About Us** - Company information, statistics, and core values
- **Services** - Service offerings management
- **FAQ Management** - Frequently asked questions
- **Contact Management** - Handle contact form submissions

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NTI-Portfolio.git
   cd NTI-Portfolio
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   FRONTEND_URL=http://localhost:4200
   ```

5. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using MongoDB Compass/Atlas
   ```

6. **Run the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm start
   ```

7. **Access the Application**
   - **Portfolio Website:** http://localhost:4200
   - **API Endpoints:** http://localhost:5000/api
   - **Dashboard:** http://localhost:4200/dashboard

## 📱 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:slug` - Update category
- `DELETE /api/categories/:slug` - Delete category

### Team Members
- `GET /api/team-members` - Get all team members
- `POST /api/team-members` - Create new team member
- `PUT /api/team-members/:id` - Update team member
- `DELETE /api/team-members/:id` - Delete team member

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### About Us
- `GET /api/about-us` - Get about information
- `POST /api/about-us` - Create about information
- `PUT /api/about-us/:id` - Update about information

## 🎨 Tech Stack

### Frontend
- ![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat&logo=tailwind-css)
- ![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=flat&logo=reactivex)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
- ![Express.js](https://img.shields.io/badge/Express.js-5.1-000000?style=flat&logo=express)
- ![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat&logo=mongodb)
- ![Mongoose](https://img.shields.io/badge/Mongoose-8.18-880000?style=flat)

## 🔧 Development

### Code Style
- **Prettier** configured for consistent formatting
- **TypeScript** strict mode enabled
- **ESLint** for code quality (recommended)

### Build Commands
```bash
# Frontend build
cd client && npm run build

# Frontend development
cd client && npm run start

# Backend development
cd server && npm start

# Run tests
cd client && npm test
```

## 📦 Deployment

### Frontend (Angular)
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend (Node.js)
```bash
cd server
# Set production environment variables
# Deploy to your hosting service (Heroku, DigitalOcean, AWS, etc.)
```

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_domain
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Angular team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the excellent database
- Express.js community for the robust web framework

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

⭐ **Star this repository if you found it helpful!**
