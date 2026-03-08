# 📝 Notes App - Full Stack Note Management System

A modern, full-featured note-taking application built with React and Node.js. Create, read, update, and delete your notes with a beautiful, responsive interface.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://note-app-route-academy.netlify.app/)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/Abdelrahman968/note-app-route)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration system
- ✍️ **Create Notes** - Add new notes with title and content
- 📖 **View Notes** - Display all your notes in a clean, organized layout
- 📑 **All Notes Page** - Browse through all your notes with pagination
- ✏️ **Edit Notes** - Update your notes anytime with an intuitive modal interface
- 🗑️ **Delete Notes** - Remove notes with a confirmation dialog
- 🔢 **Pagination** - Navigate through large collections of notes
- 📊 **Notes Counter** - Track your total number of notes on dashboard
- 🏠 **Dashboard** - Beautiful home page with statistics and quick actions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🧭 **Navigation Bar** - Easy navigation between pages
- 🦶 **Footer** - Informative footer with links
- 📄 **About Page** - Learn more about the application
- 📞 **Contact Page** - Get in touch
- 🌓 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Real-time Updates** - Instant UI updates using React Query
- 🎨 **Modern UI** - Beautiful interface built with HeroUI and Tailwind CSS
- ⬆️ **Scroll to Top** - Smooth scroll to top functionality
- ❌ **404 Page** - Custom error page for invalid routes

## 🚀 Live Demo

Check out the live application: [https://note-app-route-academy.netlify.app/](https://note-app-route-academy.netlify.app/)

## 🛠️ Built With

### Frontend
- **React 19.2** - UI framework
- **React Router DOM 7.13** - Client-side routing
- **TanStack Query (React Query) 5.90** - Server state management
- **Axios 1.13** - HTTP client
- **HeroUI 2.8** - Component library
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Framer Motion 12.34** - Animation library
- **React Hook Form 7.71** - Form validation
- **React Icons 5.5** - Icon library

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Abdelrahman968/note-app-route.git
cd note-app-route
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🏗️ Project Structure

```
note-route/
├── 📁 public/
├── 📁 src/
│   ├── 📁 assets/                    # Images and static files
│   ├── 📁 components/
│   │   ├── 📁 CreateNote/
│   │   │   └── CreateNote.jsx        # Create new note form
│   │   ├── 📁 ErrorPage/
│   │   │   └── ErrorPage.jsx         # Error display component
│   │   ├── 📁 Footer/
│   │   │   └── Footer.jsx            # Footer component
│   │   ├── 📁 Loading/
│   │   │   └── Loading.jsx           # Loading spinner
│   │   ├── 📁 Login/
│   │   │   └── Login.jsx             # Login form component
│   │   ├── 📁 MyNotes/
│   │   │   ├── Deletenotemodal.jsx   # Delete confirmation modal
│   │   │   ├── MyNotes.jsx           # Main notes display
│   │   │   └── Updatenotemodal.jsx   # Edit note modal
│   │   ├── 📁 Navbar/
│   │   │   └── Navbar.jsx            # Navigation bar
│   │   ├── 📁 NoteCard/
│   │   │   └── NoteCard.jsx          # Individual note card
│   │   ├── 📁 Pagination/
│   │   │   └── Pagination.jsx        # Pagination component
│   │   ├── 📁 Register/
│   │   │   └── Register.jsx          # Registration form
│   │   └── 📁 ScrollToTop/
│   │       └── ScrollToTop.jsx       # Auto scroll utility
│   ├── 📁 context/
│   │   ├── AuthContext.jsx           # Authentication state
│   │   └── NotesContext.jsx          # Notes state management
│   ├── 📁 pages/
│   │   ├── 📁 About/
│   │   │   └── About.jsx             # About page
│   │   ├── 📁 AlNotes/
│   │   │   └── AllNotes.jsx          # All notes page
│   │   ├── 📁 Contact/
│   │   │   └── Contact.jsx           # Contact page
│   │   ├── 📁 Error404/
│   │   │   └── Error404.jsx          # 404 error page
│   │   ├── 📁 Home/
│   │   │   ├── Home.jsx              # Main dashboard
│   │   │   └── MyNotesCount.jsx      # Notes counter widget
│   │   └── 📁 Layout/
│   │       └── Layout.jsx            # Main layout wrapper
│   ├── App.jsx                       # Main app component
│   ├── hero.js                       # HeroUI configuration
│   ├── index.css                     # Global styles
│   └── main.jsx                      # Entry point
├── .gitignore
├── README.md
├── eslint.config.js                  # ESLint configuration
├── index.html                        # HTML template
├── package.json                      # Dependencies
├── package-lock.json
└── vite.config.js                    # Vite configuration
```

## 🔑 API Endpoints

The application connects to the following API:

**Base URL:** `https://note-sigma-black.vercel.app/api/v1`

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### Notes
- `GET /notes` - Get all user notes
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

**Authentication:** All note endpoints require a token in headers:
```javascript
headers: { 
  token: `3b8ny__${userToken}` 
}
```

## 💡 Key Features Implementation

### 1. Dashboard (Home Page)
- Welcome card with personalized greeting
- Notes counter showing total number of notes
- Quick tips section for better note management
- Quick access to create new note
- Responsive grid layout

### 2. All Notes Page
- Browse through all notes
- Pagination for easy navigation
- Individual note cards with actions
- Filter and search capabilities
- Reverse chronological order (newest first)

### 3. Notes Display
- Shows notes in card format
- Displays creation and update dates
- Truncates long content with "..." 
- Empty state when no notes exist
- Hover effects and smooth transitions

### 4. Create Note
- Modal-based creation form
- Title and content validation
- Real-time UI updates after creation
- Error handling and user feedback
- Clean and intuitive interface

### 5. Update Note
- Pre-filled form with existing note data
- Input validation
- Shows creation and update timestamps
- Instant refresh after update
- Modal-based editing

### 6. Delete Note
- Confirmation modal with note preview
- Warning about permanent deletion
- Loading states during deletion
- Error handling
- Safe deletion process

### 7. Authentication
- Login and registration pages
- JWT token-based authentication
- Protected routes
- Persistent sessions
- Secure password handling

### 8. Navigation
- Responsive navbar
- Active link highlighting
- User menu with logout
- Mobile-friendly hamburger menu
- Smooth page transitions

### 9. Additional Pages
- **About Page** - Information about the app
- **Contact Page** - Ways to get in touch
- **404 Error Page** - Custom error handling
- **Footer** - Links and copyright information

### 10. State Management
- React Query for server state
- Context API for auth and notes version
- Automatic cache invalidation
- Optimistic UI updates
- Error boundaries

## 🎨 Styling

The application uses a modern design system with:

- **Color Scheme:**
  - Primary: Blue/Purple gradient
  - Success: Green
  - Danger: Red
  - Warning: Amber/Orange

- **Components:**
  - Cards with hover effects
  - Smooth transitions and animations
  - Shadow effects for depth
  - Responsive grid layouts

- **Dark Mode:**
  - Automatic theme detection
  - Consistent styling across themes
  - Proper contrast ratios

## 🔐 Authentication Flow

1. User registers with email and password
2. Server returns JWT token
3. Token stored in AuthContext
4. Token sent with every API request
5. Protected routes redirect to login if no token

## 🐛 Troubleshooting

### Notes not displaying
- Check browser console for errors
- Verify API is accessible
- Ensure token is valid
- Check network tab for API responses

### Authentication issues
- Clear browser cache and cookies
- Verify credentials are correct
- Check if backend server is running

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Abdelrahman**

- GitHub: [@Abdelrahman968](https://github.com/Abdelrahman968)
- Live Demo: [https://note-app-route-academy.netlify.app/](https://note-app-route-academy.netlify.app/)

## 🙏 Acknowledgments

- HeroUI for the component library
- TanStack Query for excellent state management
- Tailwind CSS for utility-first styling
- React Icons for beautiful icons
- Route Academy for the learning platform

## 📞 Support

For support, email se.abdelrahman968@gmail.com or open an issue in the GitHub repository.

---

⭐️ If you find this project useful, please consider giving it a star on GitHub!
# Notes-App---Front-End-Note-Management-System
