# ChatBotGemini Frontend

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Icons-orange.svg)](https://lucide.dev/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-green.svg)](https://axios-http.com/)

A modern, responsive React frontend for the ChatBot Gemini application. Features a beautiful UI with Lucide React icons, real-time chat interface, secure authentication, and seamless integration with the Gemini AI backend.

## 🚀 Features

### Core Functionality
- **💬 Real-time Chat Interface** - Smooth conversation experience with Gemini AI
- **🔐 Secure Authentication** - User registration and login with JWT tokens
- **📱 Responsive Design** - Mobile-first design that works on all devices
- **💾 Chat History** - Persistent conversation storage and retrieval
- **🎨 Modern UI/UX** - Clean, professional interface with Lucide React icons

### Technical Highlights
- **React Hooks** - Modern functional components with hooks
- **Professional Icons** - Lucide React icon library integration
- **HTTP Client** - Axios for API communication with interceptors
- **Markdown Support** - Rich text rendering for AI responses
- **Error Handling** - Comprehensive error management and user feedback
- **Loading States** - Smooth loading indicators and user experience

## 🏗️ Architecture

### Project Structure
```
ChatBotFrontend/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   └── manifest.json
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── Chat.js         # Main chat interface
│   │   ├── Login.js        # Login form component
│   │   ├── Register.js     # Registration form
│   │   └── Navbar.js       # Navigation component
│   ├── styles/             # CSS stylesheets
│   │   ├── Chat.css        # Chat interface styles
│   │   ├── login.css       # Login form styles
│   │   ├── register.css    # Registration styles
│   │   └── navbar.css      # Navigation styles
│   ├── api.js              # Axios HTTP client configuration
│   ├── App.js              # Main application component
│   ├── App.css             # Global application styles
│   ├── index.js            # Application entry point
│   └── index.css           # Global CSS styles
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel deployment configuration
└── README.md              # Project documentation
```

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19.x |
| **HTTP Client** | Axios | Latest |
| **Icons** | Lucide React | Latest |
| **Markdown** | React Markdown | Latest |
| **Routing** | React Router DOM | Latest |
| **Styling** | CSS3 | - |
| **Build Tool** | Create React App | Latest |
| **Deployment** | Vercel | - |

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Access to the ChatBot Gemini Backend API

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/asishadimulapu/ChatBotFrontend.git
cd ChatBotFrontend
```

> **Note**: Replace the repository URL with your actual frontend repository URL if different.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Then edit the `.env` file with your settings:

```env
# Backend API Configuration
REACT_APP_API_URL=https://chatbotgemini-6kem.onrender.com/api

# Build Configuration (optional)
GENERATE_SOURCEMAP=false
```

### 4. Start Development Server
```bash
npm start
```

The application will start on `http://localhost:3000`

## 🎨 Components Overview

### Chat Component (`Chat.js`)
- **Purpose**: Main chat interface with Gemini AI
- **Features**: Message sending, chat history, markdown rendering
- **Icons**: Send, Bot, User, MessageSquare
- **State Management**: Messages, loading states, user data

### Authentication Components
#### Login Component (`Login.js`)
- **Purpose**: User login interface
- **Features**: Form validation, error handling, loading states
- **Icons**: Mail, Lock, Eye, EyeOff, LogIn
- **Validation**: Email format, password requirements

#### Register Component (`Register.js`)
- **Purpose**: User registration interface
- **Features**: Form validation, password confirmation, error handling
- **Icons**: User, Mail, Lock, Eye, EyeOff, UserPlus
- **Validation**: Username, email, password strength

### Navigation Component (`Navbar.js`)
- **Purpose**: Application navigation and user menu
- **Features**: Authentication state, user profile, logout
- **Icons**: Bot, User, LogOut, LogIn, UserPlus
- **Responsive**: Mobile-friendly navigation

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API base URL | Yes | - |
| `GENERATE_SOURCEMAP` | Generate source maps | No | true |

### API Configuration (`api.js`)
```javascript
// Axios instance with interceptors
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

// Automatic JWT token handling
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
```

## 🚀 Deployment

### Vercel Deployment (Current)
The frontend is deployed on Vercel at: `https://chat-bot-gemini-frontend.vercel.app`

#### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push to main branch

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://chatbotgemini-6kem.onrender.com/api
GENERATE_SOURCEMAP=false
```

### Environment Variables for Development
```env
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=true
```

### Alternative Deployment Options
- **Netlify**: Drag and drop or Git integration
- **GitHub Pages**: Free hosting for static sites
- **AWS S3**: Scalable static website hosting
- **Firebase Hosting**: Google's hosting platform

## 🎯 Features Detail

### Modern Icon System
- **Library**: Lucide React for professional, consistent icons
- **Usage**: Replaced all emoji-based UI elements
- **Examples**: 
  - `<Send />` for message sending
  - `<Eye />` / `<EyeOff />` for password visibility
  - `<Bot />` / `<User />` for chat participants

### Chat Interface
- **Real-time Messaging**: Instant communication with Gemini AI
- **Markdown Support**: Rich text rendering for AI responses
- **Message History**: Persistent chat storage and retrieval
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error management and user notifications

### Authentication Flow
- **JWT Tokens**: Secure authentication with automatic token management
- **Form Validation**: Client-side validation with user feedback
- **Persistent Sessions**: Automatic login state management
- **Security**: Secure token storage and automatic logout on expiration

## 📱 Responsive Design

### Mobile-First Approach
- **Breakpoints**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Large touch targets and gesture support
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation

### Cross-Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Polyfills**: Automatic polyfills for missing features

## 🧪 Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject

# Install dependencies
npm install

# Check for security vulnerabilities
npm audit
```

## 📊 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic code splitting with React.lazy()
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript minification
- **Compression**: Gzip compression for production builds

### Runtime Optimization
- **Memoization**: React.memo for component optimization
- **Lazy Loading**: Lazy loading for non-critical components
- **Image Optimization**: Optimized images and formats
- **Caching**: Browser caching strategies

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Automatic Logout**: Token expiration handling
- **Secure Storage**: LocalStorage with security considerations
- **HTTPS**: Secure communication with backend API

### Input Validation
- **Client-Side Validation**: Form validation and sanitization
- **XSS Protection**: Input sanitization and encoding
- **CSRF Protection**: Cross-site request forgery prevention

## 🐛 Troubleshooting

### Common Issues

**API Connection Error**
```javascript
// Check API URL in .env file
REACT_APP_API_URL=https://chatbotgemini-6kem.onrender.com/api

// Verify CORS configuration on backend
```

**Authentication Issues**
```javascript
// Clear localStorage if tokens are corrupted
localStorage.clear();

// Check token format in Network tab
Authorization: Bearer <valid_jwt_token>
```

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear React build cache
npm start -- --reset-cache
```

**Deployment Issues**
```bash
# Verify environment variables
echo $REACT_APP_API_URL

# Check build output
npm run build
```

## 🎨 Customization

### Styling
- **CSS Modules**: Scoped CSS for components
- **Custom Properties**: CSS variables for theming
- **Responsive Design**: Media queries for different screen sizes
- **Dark Mode**: Easy theme switching implementation

### Icons
```javascript
// Import Lucide React icons
import { Send, User, Bot, MessageSquare } from 'lucide-react';

// Usage in components
<Send size={20} className="icon" />
```

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- **Backend**: [ChatBotGemini Backend](https://github.com/asishadimulapu/ChatBotGeminiBackend)
- **API Documentation**: Backend API endpoints and usage
- **Live Demo**: [https://chat-bot-gemini-frontend.vercel.app](https://chat-bot-gemini-frontend.vercel.app)

## 📞 Support

### Getting Help
1. Check the [Issues](https://github.com/asishadimulapu/ChatBotFrontend/issues) page
2. Create a new issue with detailed information
3. Include browser console errors and network requests
4. Provide steps to reproduce the issue

### Development Resources
- [React Documentation](https://reactjs.org/docs)
- [Lucide React Icons](https://lucide.dev/icons)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

⭐ **Star this repository if it helped you!**
