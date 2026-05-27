# 360° Training Feedback Platform - Technical Documentation

## Overview

A modern, enterprise-grade GenAI-powered training feedback platform built with React, TypeScript, Tailwind CSS v4, and Motion animations. The platform provides comprehensive feedback collection, AI-driven insights, and administrative controls for training programs.

---

## Table of Contents

1. [Architecture](#architecture)
2. [File Structure](#file-structure)
3. [Core Features](#core-features)
4. [Design System](#design-system)
5. [Routing & Navigation](#routing--navigation)
6. [Screens](#screens)
7. [Components](#components)
8. [State Management](#state-management)
9. [Styling & Theming](#styling--theming)
10. [Development Guide](#development-guide)

---

## Architecture

### Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS v4.1.12
- **Animations**: Motion (Framer Motion) 12.23.24
- **Charts**: Recharts 2.15.2
- **Forms**: React Hook Form 7.55.0
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React 0.487.0
- **Build Tool**: Vite 6.3.5

### Application Structure

```
┌─────────────────────────────────────────────┐
│           App.tsx (Root)                     │
│   ├── RouterProvider                         │
│   └── Toaster (Global Notifications)         │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   Login Screen          RootLayout (Protected Routes)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    Dashboard       Feedback Submission    Supervisor Evaluation
                         │                         │
                  Trainer Insights          Admin Panel
```

---

## File Structure

### `/src/app/`
Main application directory containing all React components and routes.

#### `App.tsx`
- **Purpose**: Application entry point
- **Responsibilities**:
  - Initializes React Router with route configuration
  - Provides global Toaster for notifications
  - Wraps entire app with necessary providers

#### `routes.tsx`
- **Purpose**: Centralized routing configuration
- **Routes**:
  - `/login` - Public login page
  - `/` - Protected routes under RootLayout
    - `/` (index) - Dashboard
    - `/feedback` - Feedback Submission
    - `/supervisor` - Supervisor Evaluation
    - `/insights` - Trainer Insights
    - `/admin` - Admin Panel

### `/src/app/components/`

#### `layouts/RootLayout.tsx`
- **Purpose**: Main application shell for authenticated users
- **Features**:
  - Responsive sidebar navigation (collapsible on desktop, drawer on mobile)
  - Top header with page title and user menu
  - Notification bell with badge indicator
  - User profile dropdown with logout functionality
  - Outlet for nested route rendering
- **State Management**:
  - `sidebarCollapsed`: Controls desktop sidebar width
  - `mobileMenuOpen`: Controls mobile drawer visibility

#### `screens/` (6 Core Screens)

##### `LoginScreen.tsx`
- **Purpose**: User authentication interface
- **Features**:
  - Email and password input fields
  - "Remember me" checkbox
  - "Forgot password" link
  - Login button with navigation to dashboard
  - Glassmorphism background effect
  - Gradient logo with AI branding

##### `DashboardScreen.tsx`
- **Purpose**: Executive overview with KPIs and AI insights
- **Components**:
  - 4 KPI cards (Total Trainees, Completion Rate, Avg Rating, Active Programs)
  - Performance trends line chart (7-day data)
  - Feedback distribution pie chart
  - AI-generated insights card with sparkles icon
  - Recent feedback table with status badges
- **Mock Data**: Pre-populated with realistic training metrics

##### `FeedbackSubmissionScreen.tsx`
- **Purpose**: Trainee feedback collection form
- **Features**:
  - Training program selection dropdown
  - Star rating system (1-5 stars)
  - Category ratings (Content, Delivery, Materials, Engagement)
  - Multi-line feedback textarea
  - Anonymous submission toggle
  - Submit button with success toast
- **Form Handling**: React Hook Form with validation

##### `SupervisorEvaluationScreen.tsx`
- **Purpose**: Supervisor assessment of trainee readiness
- **Features**:
  - Trainee selection dropdown
  - Training program dropdown
  - Technical skills rating (1-5)
  - Soft skills rating (1-5)
  - Readiness level indicator (Not Ready, Needs Improvement, Ready, Highly Ready)
  - AI-powered readiness recommendation badge
  - Comments textarea
  - Submit evaluation button

##### `TrainerInsightsScreen.tsx`
- **Purpose**: AI-driven analytics for trainers
- **Features**:
  - Time period selector (7/30/90 days)
  - 3 metric cards (Avg Rating, Total Feedback, Improvement Rate)
  - Feedback trends area chart
  - Category performance radar chart
  - AI recommendations list with sparkles badges
  - Action plan generator button
- **AI Elements**: All AI-generated sections clearly labeled with badges

##### `AdminPanelScreen.tsx`
- **Purpose**: Platform administration and training program management
- **Features**:
  - "Create Program" button with dialog modal
  - Program creation form (name, description, duration, trainer, start date)
  - Training programs table with edit/delete actions
  - User management section (future enhancement placeholder)
  - System settings section (future enhancement placeholder)
- **CRUD Operations**: Full create/update/delete for training programs

### `/src/app/components/ui/`
Reusable UI components built on Radix UI primitives.

**Key Components**:
- `button.tsx` - Multiple variants (default, destructive, outline, ghost, link)
- `card.tsx` - Container with header, content, footer sections
- `input.tsx` - Text input with focus states
- `badge.tsx` - Status indicators with color variants
- `dialog.tsx` - Modal overlays for forms
- `dropdown-menu.tsx` - Context menus and action dropdowns
- `select.tsx` - Dropdown selection components
- `table.tsx` - Data table structure
- `tabs.tsx` - Tabbed navigation
- `chart.tsx` - Recharts wrapper with theming
- `avatar.tsx` - User profile images with fallbacks
- `switch.tsx` - Toggle controls
- `textarea.tsx` - Multi-line text input
- `tooltip.tsx` - Hover information popups

### `/src/styles/`

#### `theme.css`
- **Purpose**: Design system tokens and CSS variables
- **Contains**:
  - Light mode color palette (default)
  - Dark mode color palette (`.dark` class)
  - Semantic color tokens (primary, secondary, muted, accent, destructive)
  - Chart colors (5-color palette)
  - Border radius values
  - Typography defaults (h1-h4, labels, buttons, inputs)
  - Sidebar-specific tokens
- **Custom Variables**:
  ```css
  --primary-blue: #4F46E5
  --secondary-purple: #7C3AED
  --success-green: #10B981
  --warning-yellow: #F59E0B
  --error-red: #EF4444
  --info-teal: #14B8A6
  ```

#### `fonts.css`
- **Purpose**: Font imports and custom web fonts
- **Usage**: Import custom fonts at the top of this file only

#### `globals.css`, `index.css`, `tailwind.css`
- **Purpose**: Global styles, Tailwind directives, and CSS resets

---

## Core Features

### 1. Authentication
- Login screen with email/password
- User session management (mock implementation)
- Protected routes via RootLayout
- Logout functionality

### 2. Dashboard Analytics
- Real-time KPI metrics
- Interactive charts (line, pie)
- AI-generated insights
- Recent activity feed

### 3. Feedback Collection
- Multi-criteria rating system
- Anonymous feedback option
- Form validation
- Success notifications

### 4. Supervisor Evaluations
- Trainee readiness assessment
- Multi-dimensional skill ratings
- AI readiness recommendations
- Evaluation history

### 5. AI Insights
- Trend analysis with charts
- Performance recommendations
- Category-based breakdowns
- Action plan suggestions

### 6. Program Management
- CRUD operations for training programs
- Trainer assignment
- Program scheduling
- Status tracking

---

## Design System

### Color Palette

**Light Mode**:
- Primary: `#4F46E5` (Indigo Blue)
- Secondary: `#7C3AED` (Purple - AI elements)
- Background: `#F9FAFB` (Light Gray)
- Card: `#FFFFFF` (White)
- Text: `#111827` (Near Black)

**Dark Mode**:
- Primary: `#6366F1` (Lighter Indigo)
- Secondary: `#8B5CF6` (Lighter Purple)
- Background: `#111827` (Dark Gray)
- Card: `#1F2937` (Charcoal)
- Text: `#F9FAFB` (Off White)

### Typography
- **Font Family**: Inter (system default sans-serif fallback)
- **Headings**: Medium weight (500)
- **Body**: Regular weight (400)
- **Buttons/Labels**: Medium weight (500)

### Spacing
- Base unit: 4px (Tailwind default)
- Component padding: 16-24px
- Card gaps: 16-32px

### Border Radius
- Default: `0.75rem` (12px)
- Buttons: `0.75rem`
- Cards: `0.75rem` to `1rem`

### Visual Effects
- **Glassmorphism**: Backdrop blur + transparency on login
- **Gradients**: Linear gradients on branding elements
- **Shadows**: Subtle shadows on cards and elevated elements
- **Animations**: Motion-based hover and entry animations

---

## Routing & Navigation

### Public Routes
- `/login` - LoginScreen (no layout)

### Protected Routes (under RootLayout)
- `/` - DashboardScreen
- `/feedback` - FeedbackSubmissionScreen
- `/supervisor` - SupervisorEvaluationScreen
- `/insights` - TrainerInsightsScreen
- `/admin` - AdminPanelScreen

### Navigation Flow
1. User lands on `/login`
2. After login → redirects to `/` (Dashboard)
3. Sidebar navigation available on all protected routes
4. Logout → returns to `/login`

---

## Screens

### 1. LoginScreen
**File**: `screens/LoginScreen.tsx`  
**Route**: `/login`  
**Purpose**: User authentication  
**Components Used**: Button, Input, Checkbox, Card  
**State**: Local form state (email, password, rememberMe)

### 2. DashboardScreen
**File**: `screens/DashboardScreen.tsx`  
**Route**: `/`  
**Purpose**: Overview metrics and insights  
**Components Used**: Card, Chart (Line, Pie), Badge, Table, Sparkles  
**Data**: Mock KPIs, feedback data, chart data

### 3. FeedbackSubmissionScreen
**File**: `screens/FeedbackSubmissionScreen.tsx`  
**Route**: `/feedback`  
**Purpose**: Collect trainee feedback  
**Components Used**: Card, Select, Input, Textarea, Switch, Button, Star icons  
**Validation**: React Hook Form

### 4. SupervisorEvaluationScreen
**File**: `screens/SupervisorEvaluationScreen.tsx`  
**Route**: `/supervisor`  
**Purpose**: Assess trainee readiness  
**Components Used**: Card, Select, Badge, Textarea, Button  
**Features**: AI recommendation, skill ratings

### 5. TrainerInsightsScreen
**File**: `screens/TrainerInsightsScreen.tsx`  
**Route**: `/insights`  
**Purpose**: AI analytics for trainers  
**Components Used**: Card, Tabs, Chart (Area, Radar), Badge, Button  
**AI Elements**: Labeled with sparkles and "AI-Generated" badges

### 6. AdminPanelScreen
**File**: `screens/AdminPanelScreen.tsx`  
**Route**: `/admin`  
**Purpose**: Platform administration  
**Components Used**: Card, Button, Dialog, Table, Input, Textarea  
**Operations**: Create, edit, delete training programs

---

## Components

### Layout Components

#### RootLayout
- Responsive sidebar (desktop: collapsible, mobile: drawer)
- Header with notifications and user menu
- Navigation state management

### UI Components (Radix-based)

All components in `components/ui/` follow these principles:
- Built on Radix UI primitives
- Fully accessible (ARIA compliant)
- Keyboard navigable
- Themeable via CSS variables
- Variant-based styling (CVA)

**Example: Button Component**
```tsx
<Button variant="default">Click me</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="ghost">Ghost</Button>
```

**Example: Card Component**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

## State Management

### Current Approach
- **Local State**: React `useState` for component-specific state
- **Form State**: React Hook Form for complex forms
- **Route State**: React Router for navigation state
- **No Global State Library**: All state is component-scoped or lifted to nearest common parent

### State Locations

**RootLayout**:
- `sidebarCollapsed` - Desktop sidebar width
- `mobileMenuOpen` - Mobile menu visibility

**Screen Components**:
- Form inputs (controlled components)
- Modal open/close states
- Selected filters (time periods, programs)
- Mock data arrays

**Future Enhancement**:
- Consider Zustand or Context API for shared state (user profile, notifications)
- Integrate real backend APIs for data fetching
- Add optimistic updates for better UX

---

## Styling & Theming

### Tailwind CSS v4

**Configuration**: No `tailwind.config.js` needed (v4 uses CSS-based config)

**Theme File**: `/src/styles/theme.css` contains all design tokens

**Usage**:
```tsx
<div className="bg-card text-foreground p-6 rounded-xl">
  <h2 className="text-xl font-medium">Heading</h2>
</div>
```

### Dark Mode

**Implementation**: 
- Uses `next-themes` library for seamless theme switching
- CSS variables defined for both light and dark themes in `/src/styles/theme.css`
- `.dark` class automatically applied to root element
- Semantic tokens automatically adjust all components
- Theme preference persists in localStorage

**Files**:
- `src/app/components/theme-provider.tsx` - ThemeProvider wrapper
- `src/app/components/theme-toggle.tsx` - Toggle button component
- `src/styles/theme.css` - Light/dark theme variables

**Usage**:
```tsx
// ThemeProvider wraps the entire app in App.tsx
<ThemeProvider>
  <RouterProvider router={router} />
</ThemeProvider>

// ThemeToggle component in RootLayout and LoginScreen
<ThemeToggle />

// Using useTheme hook in components
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
```

**Theme Toggle Locations**:
- Login Screen: Top-right corner
- Dashboard & All Protected Routes: Header next to notification bell

**Theme Colors**:

Light Mode:
- Background: `#F9FAFB` (Light Gray)
- Card: `#FFFFFF` (White)
- Primary: `#4F46E5` (Indigo)
- Text: `#111827` (Dark Gray)

Dark Mode:
- Background: `#111827` (Dark Gray)
- Card: `#1F2937` (Charcoal)
- Primary: `#6366F1` (Lighter Indigo)
- Text: `#F9FAFB` (Off-White)

### Custom Gradients

**Brand Gradient**:
```tsx
<div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]" />
```

**Glassmorphism**:
```tsx
<div className="backdrop-blur-xl bg-white/10 border border-white/20" />
```

---

## Development Guide

### Setup

```bash
# Install dependencies
pnpm install

# Start dev server (already running in Figma Make)
# Auto-reload enabled
```

### File Organization

**When to create a new component**:
- Reused in 2+ screens → `components/ui/`
- Screen-specific → Keep in screen file or create `components/screens/ScreenName/`
- Layout component → `components/layouts/`

**Naming Conventions**:
- Components: PascalCase (`DashboardScreen.tsx`)
- Utilities: camelCase (`utils.ts`)
- CSS files: kebab-case (`theme.css`)

### Adding New Screens

1. Create file in `components/screens/NewScreen.tsx`
2. Add route in `routes.tsx`:
   ```tsx
   { path: "new-route", Component: NewScreen }
   ```
3. Add navigation item in `RootLayout.tsx`:
   ```tsx
   { icon: IconName, label: "New Screen", path: "/new-route" }
   ```
4. Import required UI components from `components/ui/`

### Working with Forms

**Use React Hook Form**:
```tsx
import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register("fieldName")} />
</form>
```

### Adding Charts

**Use Recharts with custom theming**:
```tsx
import { LineChart, Line, XAxis, YAxis } from "recharts";

<LineChart data={data}>
  <Line dataKey="value" stroke="hsl(var(--primary))" />
</LineChart>
```

### Toast Notifications

**Using Sonner**:
```tsx
import { toast } from "sonner";

toast.success("Operation successful!");
toast.error("Something went wrong");
toast.info("FYI message");
```

---

## Mock Data Structure

### Dashboard KPIs
```typescript
{
  totalTrainees: number,
  completionRate: number,
  avgRating: number,
  activePrograms: number
}
```

### Feedback Entry
```typescript
{
  id: string,
  trainee: string,
  program: string,
  rating: number,
  date: string,
  status: "positive" | "neutral" | "needs-attention"
}
```

### Training Program
```typescript
{
  id: string,
  name: string,
  description: string,
  duration: string,
  trainer: string,
  startDate: string,
  status: "active" | "upcoming" | "completed"
}
```

---

## Key Design Patterns

### AI Element Labeling
All AI-generated content is clearly marked:
```tsx
<Badge className="bg-gradient-to-r from-[#7C3AED] to-[#4F46E5]">
  <Sparkles className="w-3 h-3" />
  AI-Generated
</Badge>
```

### Responsive Layout
```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Glassmorphism Cards
```tsx
<div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
```

### Smooth Animations
```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: Backdrop filter, CSS Grid, Flexbox, CSS Variables
- **JavaScript**: ES6+ modules, async/await

---

## Performance Considerations

### Optimizations Applied
- Code splitting via React Router lazy loading (potential)
- Tailwind CSS purging (production build)
- Motion animations use GPU-accelerated properties
- SVG icons (Lucide) tree-shakeable

### Best Practices
- Avoid inline styles (use Tailwind classes)
- Memoize expensive computations with `useMemo`
- Use `React.memo` for pure components
- Lazy load heavy components (charts, modals)

---

## Security Notes

### Current Implementation (Mock)
- No real authentication (demo purposes)
- No API endpoints
- No sensitive data storage

### Production Recommendations
- Implement JWT-based authentication
- Add CSRF protection
- Sanitize user inputs
- Use HTTPS only
- Add rate limiting on APIs
- Implement role-based access control (RBAC)

---

## Future Enhancements

### Planned Features
1. **Backend Integration**
   - REST API or GraphQL endpoints
   - Real-time updates (WebSocket)
   - Database persistence

2. **Advanced AI Features**
   - Natural language feedback analysis
   - Predictive analytics for trainee success
   - Automated action plan generation

3. **Collaboration Tools**
   - Comments on feedback
   - @mentions for trainers
   - Real-time notifications

4. **Reporting & Export**
   - PDF report generation
   - CSV export for data analysis
   - Custom dashboard widgets

5. **Mobile App**
   - React Native version
   - Progressive Web App (PWA)

---

## Troubleshooting

### Common Issues

**Issue**: Routes not working  
**Solution**: Ensure `RouterProvider` wraps the app in `App.tsx`

**Issue**: Styles not applying  
**Solution**: Check that CSS files are imported in correct order in `index.css`

**Issue**: Dark mode not toggling  
**Solution**: Verify `.dark` class is added to `<html>` or root element

**Issue**: Form not submitting  
**Solution**: Check React Hook Form setup and `onSubmit` handler

---

## Support & Contribution

### Getting Help
- Review component documentation in `/src/app/components/ui/`
- Check Radix UI docs for component APIs
- Refer to Tailwind CSS v4 documentation

### Code Style
- Use TypeScript for type safety
- Follow React best practices (hooks, functional components)
- Keep components small and focused
- Write self-documenting code with clear names

---

## License

This is a demo application built for training purposes.

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Built with**: React + TypeScript + Tailwind CSS v4
