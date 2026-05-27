# File Guide - What Does What

> Quick reference guide mapping functionality to files in the Training Feedback Platform

---

## 🎯 Application Entry Points

| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/app/App.tsx` | Application root | `App` component |
| `src/app/routes.tsx` | Route configuration | `router` object |
| `src/styles/index.css` | CSS entry point | Imports all stylesheets |

---

## 🎨 Theming & Styles

### Theme System
| File | Controls | Variables |
|------|----------|-----------|
| `src/styles/theme.css` | Light/dark color tokens | 50+ CSS variables |
| `src/app/components/theme-provider.tsx` | Theme context | `ThemeProvider` |
| `src/app/components/theme-toggle.tsx` | Theme switch button | `ThemeToggle` |

**Key Variables in theme.css**:
- `--background`, `--foreground` - Main colors
- `--card`, `--card-foreground` - Card colors
- `--primary`, `--secondary` - Brand colors
- `--muted`, `--accent` - Secondary colors
- `--border`, `--input` - Border colors
- All repeated in `.dark` for dark mode

### Other Styles
| File | Purpose |
|------|---------|
| `src/styles/globals.css` | Global CSS resets |
| `src/styles/fonts.css` | Font imports |
| `src/styles/tailwind.css` | Tailwind directives |

---

## 🏗 Layout Components

| File | What It Does | Used Where |
|------|--------------|------------|
| `src/app/components/layouts/RootLayout.tsx` | Main app shell with sidebar & header | Wraps all protected routes |

**RootLayout Features**:
- Desktop sidebar (collapsible)
- Mobile drawer menu
- Top header with notifications
- User profile dropdown
- Theme toggle button
- Route-based active states

---

## 📱 Screen Components

### 1. Login Screen
**File**: `src/app/components/screens/LoginScreen.tsx`  
**Route**: `/login`  
**Contains**:
- Email/password form
- SSO buttons (Google, GitHub)
- Theme toggle (top-right)
- Glassmorphism background
- Gradient decorative elements

### 2. Dashboard Screen
**File**: `src/app/components/screens/DashboardScreen.tsx`  
**Route**: `/` (index)  
**Contains**:
- 4 KPI cards (Total Trainees, Completion Rate, Avg Rating, Active Programs)
- Performance trends line chart
- Feedback distribution pie chart
- AI insights card with sparkles badge
- Recent feedback table

**Mock Data Variables**:
```tsx
kpiData           // KPI numbers
chartData         // 7-day performance data
pieData           // Feedback distribution
recentFeedback    // Recent entries table
```

### 3. Feedback Submission Screen
**File**: `src/app/components/screens/FeedbackSubmissionScreen.tsx`  
**Route**: `/feedback`  
**Contains**:
- Training program selector
- Overall star rating (1-5)
- Category ratings (Content, Delivery, Materials, Engagement)
- Feedback textarea
- Anonymous toggle switch
- Submit button

**Form Fields**:
- `program` - Selected training program
- `rating` - Overall rating
- `categoryRatings` - Object with 4 category scores
- `feedback` - Text comments
- `anonymous` - Boolean flag

### 4. Supervisor Evaluation Screen
**File**: `src/app/components/screens/SupervisorEvaluationScreen.tsx`  
**Route**: `/supervisor`  
**Contains**:
- Trainee selector dropdown
- Training program dropdown
- Technical skills rating (1-5)
- Soft skills rating (1-5)
- Readiness level display with AI badge
- Comments textarea
- Submit button

**Readiness Levels**:
- Not Ready (rating 1-2)
- Needs Improvement (rating 2.5-3)
- Ready (rating 3.5-4)
- Highly Ready (rating 4.5-5)

### 5. Trainer Insights Screen
**File**: `src/app/components/screens/TrainerInsightsScreen.tsx`  
**Route**: `/insights`  
**Contains**:
- Time period tabs (7 days / 30 days / 90 days)
- 3 metric cards (Avg Rating, Total Feedback, Improvement Rate)
- Feedback trends area chart
- Category performance radar chart
- AI recommendations list (4 items)
- Generate action plan button

**AI Features**:
- All marked with sparkles icon
- "AI-Generated" badges
- Purple gradient backgrounds

### 6. Admin Panel Screen
**File**: `src/app/components/screens/AdminPanelScreen.tsx`  
**Route**: `/admin`  
**Contains**:
- "Create New Program" button → Dialog
- Training programs table (name, duration, trainer, start date, status)
- Edit/Delete actions per program
- User management placeholder
- System settings placeholder

**Program Management**:
- Create program dialog form
- Edit program (inline)
- Delete program (confirmation)
- Status badges (Active, Upcoming, Completed)

---

## 🧩 UI Components (`src/app/components/ui/`)

### Form Components
| File | Component | Usage |
|------|-----------|-------|
| `input.tsx` | `<Input>` | Text inputs with dark mode support |
| `textarea.tsx` | `<Textarea>` | Multi-line text input |
| `label.tsx` | `<Label>` | Form field labels |
| `checkbox.tsx` | `<Checkbox>` | Checkboxes |
| `switch.tsx` | `<Switch>` | Toggle switches |
| `radio-group.tsx` | `<RadioGroup>` | Radio button groups |
| `select.tsx` | `<Select>` | Dropdown selectors |
| `form.tsx` | Form helpers | React Hook Form integration |

### Display Components
| File | Component | Usage |
|------|-----------|-------|
| `button.tsx` | `<Button>` | Buttons with variants (default, outline, ghost, etc.) |
| `card.tsx` | `<Card>` | Container with header/content/footer |
| `badge.tsx` | `<Badge>` | Status labels and tags |
| `avatar.tsx` | `<Avatar>` | User profile images |
| `separator.tsx` | `<Separator>` | Divider lines |
| `skeleton.tsx` | `<Skeleton>` | Loading placeholders |

### Navigation Components
| File | Component | Usage |
|------|-----------|-------|
| `navigation-menu.tsx` | `<NavigationMenu>` | Top navigation |
| `breadcrumb.tsx` | `<Breadcrumb>` | Page breadcrumbs |
| `tabs.tsx` | `<Tabs>` | Tab navigation |
| `pagination.tsx` | `<Pagination>` | Page navigation |

### Overlay Components
| File | Component | Usage |
|------|-----------|-------|
| `dialog.tsx` | `<Dialog>` | Modal dialogs |
| `drawer.tsx` | `<Drawer>` | Slide-out panels |
| `sheet.tsx` | `<Sheet>` | Side panels |
| `popover.tsx` | `<Popover>` | Floating content |
| `tooltip.tsx` | `<Tooltip>` | Hover tooltips |
| `dropdown-menu.tsx` | `<DropdownMenu>` | Dropdown menus |
| `context-menu.tsx` | `<ContextMenu>` | Right-click menus |
| `hover-card.tsx` | `<HoverCard>` | Hover information |

### Data Display
| File | Component | Usage |
|------|-----------|-------|
| `table.tsx` | `<Table>` | Data tables |
| `chart.tsx` | `<ChartContainer>` | Chart wrapper |
| `progress.tsx` | `<Progress>` | Progress bars |
| `scroll-area.tsx` | `<ScrollArea>` | Custom scrollbars |

### Feedback Components
| File | Component | Usage |
|------|-----------|-------|
| `alert.tsx` | `<Alert>` | Inline alerts |
| `alert-dialog.tsx` | `<AlertDialog>` | Confirmation dialogs |
| `sonner.tsx` | `<Toaster>` | Toast notifications |

### Utilities
| File | Exports | Purpose |
|------|---------|---------|
| `utils.ts` | `cn()` | Class name merger |
| `use-mobile.ts` | `useIsMobile()` | Mobile detection hook |

---

## 📊 Chart Components

All charts use **Recharts** library:

### Dashboard Charts
**Location**: `DashboardScreen.tsx`

```tsx
// Performance Trends (Line Chart)
<LineChart data={chartData}>
  <Line dataKey="value" stroke="hsl(var(--primary))" />
</LineChart>

// Feedback Distribution (Pie Chart)
<PieChart>
  <Pie data={pieData} dataKey="value" />
</PieChart>
```

### Trainer Insights Charts
**Location**: `TrainerInsightsScreen.tsx`

```tsx
// Feedback Trends (Area Chart)
<AreaChart data={feedbackTrends}>
  <Area dataKey="feedback" fill="hsl(var(--primary))" />
</AreaChart>

// Category Performance (Radar Chart)
<RadarChart data={categoryData}>
  <Radar dataKey="score" stroke="hsl(var(--secondary))" />
</RadarChart>
```

---

## 🎨 Design Tokens Reference

### Color Usage Map

| Token | Light Mode | Dark Mode | Used For |
|-------|------------|-----------|----------|
| `background` | `#F9FAFB` | `#111827` | Main app background |
| `foreground` | `#111827` | `#F9FAFB` | Body text |
| `card` | `#FFFFFF` | `#1F2937` | Card backgrounds |
| `primary` | `#4F46E5` | `#6366F1` | Buttons, links |
| `secondary` | `#7C3AED` | `#8B5CF6` | AI elements |
| `muted` | `#F3F4F6` | `#374151` | Disabled states |
| `border` | `#E5E7EB` | `#374151` | Borders |
| `destructive` | `#EF4444` | `#F87171` | Errors, delete |

### Where Colors Are Used

**Primary Color** (`#4F46E5` / `#6366F1`):
- Primary buttons
- Active navigation items
- Links and anchors
- Chart primary data
- Focus rings

**Secondary Color** (`#7C3AED` / `#8B5CF6`):
- AI-generated badges
- Sparkles icons
- Gradient overlays
- Secondary charts
- Accent highlights

**Success Green** (`#10B981` / `#34D399`):
- Positive status badges
- Success messages
- Completion indicators

**Warning Yellow** (`#F59E0B` / `#FBBF24`):
- Warning alerts
- Needs attention badges

**Error Red** (`#EF4444` / `#F87171`):
- Error messages
- Destructive actions
- Validation errors

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript configuration |

---

## 📦 Key Dependencies

### Production Dependencies
```json
{
  "react": "18.3.1",
  "react-router": "7.13.0",
  "next-themes": "0.4.6",        // Theme switching
  "lucide-react": "0.487.0",     // Icons
  "recharts": "2.15.2",          // Charts
  "react-hook-form": "7.55.0",   // Forms
  "motion": "12.23.24",          // Animations
  "sonner": "2.0.3",             // Toasts
  "@radix-ui/*": "various"       // UI primitives
}
```

### Dev Dependencies
```json
{
  "tailwindcss": "4.1.12",
  "@vitejs/plugin-react": "4.7.0",
  "vite": "6.3.5"
}
```

---

## 🚀 Common Tasks

### Change Theme Colors
**File to Edit**: `src/styles/theme.css`

```css
/* Update these variables */
:root {
  --primary: #4F46E5;      /* Your new primary color */
  --secondary: #7C3AED;    /* Your new secondary color */
}

.dark {
  --primary: #6366F1;      /* Dark mode primary */
  --secondary: #8B5CF6;    /* Dark mode secondary */
}
```

### Add New Screen
1. Create `src/app/components/screens/NewScreen.tsx`
2. Add route in `src/app/routes.tsx`
3. Add nav item in `src/app/components/layouts/RootLayout.tsx`

### Modify Dashboard KPIs
**File to Edit**: `src/app/components/screens/DashboardScreen.tsx`

```tsx
// Line 10-13
const kpiData = [
  { label: "Your New KPI", value: "123", change: "+5%", trend: "up" },
  // ...
];
```

### Change AI Badge Style
**Search for**: `"AI-Generated"` across all files

**Common Pattern**:
```tsx
<Badge className="bg-gradient-to-r from-[#7C3AED] to-[#4F46E5]">
  <Sparkles className="w-3 h-3" />
  AI-Generated
</Badge>
```

### Add New Chart
1. Import from `recharts`
2. Wrap in `<ChartContainer>` from `ui/chart.tsx`
3. Use theme colors: `hsl(var(--primary))`
4. Add responsive container

---

## 🔍 Quick File Finder

### Need to change...

**Login page appearance?**  
→ `src/app/components/screens/LoginScreen.tsx`

**Sidebar navigation?**  
→ `src/app/components/layouts/RootLayout.tsx` (line 26-32)

**Dashboard charts?**  
→ `src/app/components/screens/DashboardScreen.tsx` (lines 60-120)

**Theme colors?**  
→ `src/styles/theme.css`

**Theme toggle button?**  
→ `src/app/components/theme-toggle.tsx`

**Form validation?**  
→ Search for `useForm` in respective screen files

**Button styles?**  
→ `src/app/components/ui/button.tsx`

**Toast messages?**  
→ Import `toast` from `sonner`, already configured in `App.tsx`

---

## 📝 Variable Naming Conventions

### Component Props
```tsx
className  // CSS classes
children   // Child elements
variant    // Component variant (e.g., "default", "outline")
size       // Size variant (e.g., "sm", "md", "lg")
```

### State Variables
```tsx
isOpen       // Boolean states
setIsOpen    // State setters
handleClick  // Event handlers
```

### Data Arrays
```tsx
kpiData           // Dashboard KPIs
chartData         // Chart datasets
feedbackList      // Feedback entries
programs          // Training programs
```

---

## 🎯 Entry Points by Feature

| Feature | Main File | Supporting Files |
|---------|-----------|------------------|
| **Theming** | `theme-provider.tsx` | `theme-toggle.tsx`, `theme.css` |
| **Routing** | `routes.tsx` | `RootLayout.tsx`, screen files |
| **Forms** | Screen files | `ui/input.tsx`, `ui/select.tsx` |
| **Charts** | Screen files | `ui/chart.tsx`, recharts |
| **Navigation** | `RootLayout.tsx` | `routes.tsx` |
| **Notifications** | `App.tsx` (Toaster) | `ui/sonner.tsx` |

---

**Last Updated**: May 2026  
**For detailed documentation, see**: [DOCUMENTATION.md](./DOCUMENTATION.md)
