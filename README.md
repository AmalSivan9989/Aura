# 360° Training Feedback Platform (FeedbackAI)

> A modern, enterprise-grade GenAI-powered training feedback platform with comprehensive analytics, AI-driven insights, and seamless dark/light mode support.

![Platform Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38bdf8)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Development](#development)
- [Contributing](#contributing)

---

## 🎯 Overview

FeedbackAI is a comprehensive training feedback management platform designed for enterprise training programs. It combines traditional feedback collection with AI-powered analytics to provide actionable insights for trainers, supervisors, and administrators.

### Key Highlights

✨ **AI-Powered Insights** - Automated analysis and recommendations  
🎨 **Modern UI/UX** - Clean, minimal SaaS dashboard design  
🌓 **Dark/Light Mode** - Seamless theme switching with persistence  
📊 **Rich Analytics** - Interactive charts and KPI tracking  
📱 **Responsive Design** - Mobile-first approach  
🔐 **Enterprise-Ready** - Built with security and scalability in mind

---

## ✨ Features

### Core Functionality

- **Dashboard Analytics**
  - Real-time KPI cards (Total Trainees, Completion Rate, Avg Rating, Active Programs)
  - Performance trend charts (7-day line charts)
  - Feedback distribution visualizations
  - AI-generated insights and recommendations
  - Recent feedback activity feed

- **Feedback Submission**
  - Multi-criteria rating system (1-5 stars)
  - Category-specific ratings (Content, Delivery, Materials, Engagement)
  - Anonymous feedback option
  - Rich text comments
  - Form validation with React Hook Form

- **Supervisor Evaluation**
  - Trainee readiness assessment
  - Technical and soft skills rating
  - AI-powered readiness recommendations
  - Detailed evaluation comments
  - Historical evaluation tracking

- **Trainer Insights**
  - Time-period analytics (7/30/90 days)
  - Feedback trend analysis with area charts
  - Category performance radar charts
  - AI-generated improvement recommendations
  - Action plan generation

- **Admin Panel**
  - Training program management (CRUD operations)
  - Program scheduling and assignment
  - Trainer allocation
  - User management (placeholder)
  - System settings (placeholder)

### Design Features

🎨 **Visual Design**
- Primary Color: `#4F46E5` (Indigo Blue)
- Secondary Color: `#7C3AED` (Purple - AI Elements)
- Glassmorphism effects on login screen
- Subtle gradients throughout
- Smooth micro-interactions with Motion

🌓 **Theming**
- Complete dark/light mode support
- Theme persistence in localStorage
- Accessible theme toggle on all screens
- Semantic color tokens for consistency

📱 **Responsive**
- Mobile-first design
- Collapsible sidebar on desktop
- Drawer navigation on mobile
- Optimized for all screen sizes

---

## 📸 Screenshots

### Light Mode
- Login Screen with glassmorphism
- Dashboard with KPI cards and charts
- Feedback forms and evaluation screens

### Dark Mode
- Automatic color scheme adaptation
- High contrast for readability
- All components theme-aware

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd training-feedback-platform

# Install dependencies
pnpm install

# Start development server (auto-starts in Figma Make)
# No manual start needed in this environment
```

### First Run

1. Application loads at login screen (`/login`)
2. Enter any email/password to access dashboard
3. Toggle theme using sun/moon icon in top-right
4. Navigate using sidebar menu

---

## 📁 Project Structure

```
/workspaces/default/code/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layouts/
│   │   │   │   └── RootLayout.tsx          # Main app shell with sidebar
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.tsx         # Authentication page
│   │   │   │   ├── DashboardScreen.tsx     # KPI overview
│   │   │   │   ├── FeedbackSubmissionScreen.tsx
│   │   │   │   ├── SupervisorEvaluationScreen.tsx
│   │   │   │   ├── TrainerInsightsScreen.tsx
│   │   │   │   └── AdminPanelScreen.tsx    # Program management
│   │   │   ├── ui/                         # Reusable UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── chart.tsx
│   │   │   │   └── ... (40+ components)
│   │   │   ├── theme-provider.tsx          # Theme context wrapper
│   │   │   └── theme-toggle.tsx            # Dark/light switch
│   │   ├── App.tsx                         # Application root
│   │   └── routes.tsx                      # Route configuration
│   └── styles/
│       ├── theme.css                       # Design tokens & variables
│       ├── globals.css                     # Global styles
│       ├── fonts.css                       # Font imports
│       └── index.css                       # CSS entry point
├── DOCUMENTATION.md                        # Complete technical docs
├── THEME-GUIDE.md                          # Dark/light mode guide
├── README.md                               # This file
└── package.json                            # Dependencies
```

---

## 📚 Documentation

Comprehensive documentation is available in separate files:

### Main Documentation
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete technical documentation
  - Architecture overview
  - File structure and responsibilities
  - Component API reference
  - State management patterns
  - Styling guidelines
  - Development best practices

### Theme Guide
- **[THEME-GUIDE.md](./THEME-GUIDE.md)** - Dark/Light mode implementation
  - Theme system overview
  - Color palette reference
  - Component theming patterns
  - Customization guide
  - Accessibility considerations
  - Troubleshooting tips

---

## 🛠 Tech Stack

### Frontend Framework
- **React** 18.3.1 - UI library
- **TypeScript** - Type safety
- **React Router** 7.13.0 - Client-side routing

### Styling
- **Tailwind CSS** 4.1.12 - Utility-first CSS
- **next-themes** 0.4.6 - Theme management
- **class-variance-authority** - Component variants
- **tailwind-merge** - Class merging

### UI Components
- **Radix UI** - Accessible primitives
  - Dialog, Dropdown, Popover, Select, Tabs, etc.
- **Lucide React** - Icon library
- **Recharts** - Chart library
- **Sonner** - Toast notifications

### Animation
- **Motion** (Framer Motion) 12.23.24 - Smooth animations

### Forms & Validation
- **React Hook Form** 7.55.0 - Form management
- **date-fns** - Date utilities

### Build Tools
- **Vite** 6.3.5 - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite

---

## 🎨 Key Features

### 1. Comprehensive Dashboard
Track all training metrics in one place with real-time KPI cards, interactive charts, and recent activity feeds.

### 2. AI-Powered Insights
Every AI-generated element is clearly labeled with sparkles icon and "AI-Generated" badges, including:
- Readiness recommendations
- Performance insights
- Improvement suggestions
- Trend predictions

### 3. Multi-Role Support
Different interfaces for different stakeholders:
- **Trainees** - Submit feedback
- **Supervisors** - Evaluate readiness
- **Trainers** - View insights
- **Admins** - Manage programs

### 4. Rich Data Visualization
Multiple chart types powered by Recharts:
- Line charts for trends
- Pie charts for distribution
- Area charts for metrics
- Radar charts for category performance

### 5. Form Validation
All forms use React Hook Form with:
- Real-time validation
- Error messages
- Required field indicators
- Success notifications

### 6. Responsive Navigation
- Desktop: Collapsible sidebar
- Mobile: Drawer menu
- Active route highlighting
- Smooth transitions

---

## 👨‍💻 Development

### File Naming Conventions
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `kebab-case.css`

### Adding New Features

#### Creating a New Screen
```tsx
// 1. Create component in src/app/components/screens/
export function NewScreen() {
  return <div>New Screen Content</div>;
}

// 2. Add route in src/app/routes.tsx
{ path: "new", Component: NewScreen }

// 3. Add navigation item in RootLayout.tsx
{ icon: IconName, label: "New", path: "/new" }
```

#### Creating a New Component
```tsx
// Place in src/app/components/ui/ if reusable
import { cn } from "./utils";

export function MyComponent({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      Content
    </div>
  );
}
```

### Best Practices

✅ **Do:**
- Use semantic color tokens (`bg-card`, `text-foreground`)
- Test in both light and dark modes
- Use React Hook Form for forms
- Keep components focused and small
- Write accessible markup

❌ **Don't:**
- Hard-code colors (`bg-white`, `text-black`)
- Use inline styles
- Bypass form validation
- Create files outside project structure
- Skip dark mode testing

---

## 🎯 Mock Data

All screens use mock data for demonstration:

### Dashboard
- KPI metrics (total trainees, completion rate, etc.)
- 7-day performance trends
- Feedback distribution data
- Recent feedback entries

### Forms
- Training program lists
- Trainee rosters
- Predefined rating scales

### Admin Panel
- Sample training programs with status

> **Production Note**: Replace mock data with real API calls in production environment.

---

## 🔐 Security Considerations

**Current Implementation** (Demo):
- No real authentication
- No backend APIs
- Mock data only

**Production Recommendations**:
- Implement JWT-based authentication
- Add CSRF protection
- Sanitize all user inputs
- Use HTTPS exclusively
- Add rate limiting
- Implement RBAC (Role-Based Access Control)
- Encrypt sensitive data
- Add audit logging

---

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

**Required Features**:
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS backdrop-filter
- ES6+ JavaScript
- Async/await

---

## 🚀 Future Enhancements

### Planned Features

- [ ] Real backend API integration
- [ ] User authentication and authorization
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced AI features (NLP feedback analysis)
- [ ] PDF report generation
- [ ] CSV data export
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (i18n)

### Nice-to-Haves

- [ ] Drag-and-drop dashboard customization
- [ ] Custom report builder
- [ ] Integration with LMS platforms
- [ ] Video feedback uploads
- [ ] Automated action plan generation
- [ ] Slack/Teams integration

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Make changes following conventions
3. Test in both themes
4. Update documentation
5. Submit pull request

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Write self-documenting code
- Add comments only for complex logic
- Use semantic HTML

---

## 📄 License

This is a demonstration project built for training and educational purposes.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)
- [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📞 Support

For issues or questions:
1. Check [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed guides
2. Review [THEME-GUIDE.md](./THEME-GUIDE.md) for theming issues
3. Check component source code for implementation details

---

## 📊 Project Stats

- **Total Components**: 50+
- **Screens**: 6 core screens
- **UI Components**: 40+ reusable components
- **Lines of Code**: ~5000+
- **Dependencies**: 60+ packages
- **Theme Support**: Light & Dark modes

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

---

Last Updated: May 2026 | Version 1.0.0
