# Dark/Light Mode Guide - FeedbackAI Platform

## Quick Overview

The Training Feedback Platform includes a complete dark/light mode implementation using the `next-themes` library. Users can toggle between themes with a single click, and their preference is automatically saved.

---

## How It Works

### 1. Theme Provider Setup

**File**: `/src/app/components/theme-provider.tsx`

The `ThemeProvider` component wraps the entire application in `App.tsx`:

```tsx
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

**Configuration**:
- `attribute="class"` - Applies `.dark` class to `<html>` element
- `defaultTheme="light"` - Starts in light mode by default
- `enableSystem={false}` - Disables automatic system preference detection
- Theme preference saved in localStorage

---

### 2. Theme Toggle Component

**File**: `/src/app/components/theme-toggle.tsx`

A button that switches between light and dark modes with animated icon transitions:

```tsx
import { ThemeToggle } from "../theme-toggle";

// Use in any component
<ThemeToggle />
```

**Features**:
- Sun icon for light mode
- Moon icon for dark mode
- Smooth rotation animation on toggle
- Accessible with screen reader support

**Locations**:
1. **Login Screen** - Top right corner
2. **All Protected Routes** - Header bar (next to notification bell)

---

### 3. Theme Variables

**File**: `/src/styles/theme.css`

All colors are defined as CSS custom properties (variables) that change based on the `.dark` class:

#### Light Mode (Default)
```css
:root {
  --background: #F9FAFB;
  --foreground: #111827;
  --card: #FFFFFF;
  --primary: #4F46E5;
  --secondary: #7C3AED;
  --muted: #F3F4F6;
  --border: #E5E7EB;
  /* ... more variables */
}
```

#### Dark Mode
```css
.dark {
  --background: #111827;
  --foreground: #F9FAFB;
  --card: #1F2937;
  --primary: #6366F1;
  --secondary: #8B5CF6;
  --muted: #374151;
  --border: #374151;
  /* ... more variables */
}
```

---

## Using Themes in Components

### Method 1: Tailwind Semantic Tokens (Recommended)

Use semantic color names instead of hard-coded hex values:

```tsx
// ✅ Good - Automatically adapts to theme
<div className="bg-card text-foreground border-border">
  <h2 className="text-primary">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ Bad - Fixed color, doesn't change with theme
<div className="bg-white text-gray-900 border-gray-200">
  <h2 className="text-indigo-600">Title</h2>
</div>
```

### Method 2: Dark Mode Variant Classes

Use Tailwind's `dark:` prefix for specific overrides:

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

### Method 3: Programmatic Theme Access

Use the `useTheme` hook from `next-themes`:

```tsx
import { useTheme } from "next-themes";

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}
```

---

## Complete Color Palette

### Light Mode Colors

| Token | Hex Color | Usage |
|-------|-----------|-------|
| `--background` | `#F9FAFB` | Main app background |
| `--foreground` | `#111827` | Primary text color |
| `--card` | `#FFFFFF` | Card backgrounds |
| `--primary` | `#4F46E5` | Primary buttons, links |
| `--secondary` | `#7C3AED` | AI elements, accents |
| `--muted` | `#F3F4F6` | Disabled states |
| `--accent` | `#EEF2FF` | Hover backgrounds |
| `--border` | `#E5E7EB` | Borders, dividers |
| `--destructive` | `#EF4444` | Error states |

### Dark Mode Colors

| Token | Hex Color | Usage |
|-------|-----------|-------|
| `--background` | `#111827` | Main app background |
| `--foreground` | `#F9FAFB` | Primary text color |
| `--card` | `#1F2937` | Card backgrounds |
| `--primary` | `#6366F1` | Primary buttons, links |
| `--secondary` | `#8B5CF6` | AI elements, accents |
| `--muted` | `#374151` | Disabled states |
| `--accent` | `#1E1B4B` | Hover backgrounds |
| `--border` | `#374151` | Borders, dividers |
| `--destructive` | `#F87171` | Error states |

---

## Best Practices

### ✅ Do's

1. **Use Semantic Tokens**
   ```tsx
   <Card className="bg-card border-border">
   ```

2. **Use Theme-Aware Gradients**
   ```tsx
   <div className="bg-gradient-to-br from-primary to-secondary">
   ```

3. **Test Both Themes**
   - Always check your UI in both light and dark modes
   - Ensure text remains readable
   - Verify contrast ratios meet accessibility standards

4. **Use Tailwind Variables**
   ```tsx
   <div style={{ backgroundColor: 'hsl(var(--card))' }}>
   ```

### ❌ Don'ts

1. **Avoid Hard-Coded Colors**
   ```tsx
   // Bad
   <div className="bg-white text-black">
   
   // Good
   <div className="bg-card text-foreground">
   ```

2. **Don't Mix Approaches**
   - Stick to semantic tokens for consistency
   - Use `dark:` variants only when semantic tokens aren't enough

3. **Don't Forget Input Backgrounds**
   ```tsx
   // Good - uses proper background variable
   <Input className="bg-input-background" />
   ```

---

## Component Examples

### Card with Theme Support
```tsx
<Card className="bg-card border-border shadow-sm">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
    <CardDescription className="text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent className="text-foreground">
    Content here
  </CardContent>
</Card>
```

### Button with Primary Color
```tsx
<Button className="bg-primary text-primary-foreground hover:opacity-90">
  Click Me
</Button>
```

### Input Field
```tsx
<Input 
  className="bg-input-background border-border text-foreground focus:ring-ring"
  placeholder="Enter text..."
/>
```

### Gradient Badge (AI Elements)
```tsx
<Badge className="bg-gradient-to-r from-secondary to-primary text-white">
  <Sparkles className="w-3 h-3 mr-1" />
  AI-Generated
</Badge>
```

---

## Customizing Themes

### Adding a New Color Token

1. **Add to both light and dark sections in `theme.css`**:
   ```css
   :root {
     --success: #10B981;
   }
   
   .dark {
     --success: #34D399;
   }
   ```

2. **Register in Tailwind theme config**:
   ```css
   @theme inline {
     --color-success: var(--success);
   }
   ```

3. **Use in components**:
   ```tsx
   <div className="bg-success text-white">Success!</div>
   ```

### Creating a Custom Theme

You can extend the theme system to support additional themes (e.g., "midnight", "ocean"):

1. Add new class in `theme.css`:
   ```css
   .midnight {
     --background: #0A0E27;
     --card: #1A1F3A;
     /* ... other variables */
   }
   ```

2. Update ThemeProvider:
   ```tsx
   <NextThemesProvider
     themes={['light', 'dark', 'midnight']}
   >
   ```

---

## Accessibility

### Contrast Ratios

All color combinations meet WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Screen Reader Support

The theme toggle includes proper ARIA labels:
```tsx
<span className="sr-only">Toggle theme</span>
```

### Keyboard Navigation

- Press `Tab` to focus the theme toggle
- Press `Enter` or `Space` to toggle theme

---

## Troubleshooting

### Theme Not Persisting
**Issue**: Theme resets on page reload  
**Solution**: Check that `next-themes` is properly installed and ThemeProvider is at app root

### Flash of Unstyled Content (FOUC)
**Issue**: Brief light mode flash in dark mode  
**Solution**: ThemeToggle component includes mounting check to prevent hydration issues

### Colors Not Changing
**Issue**: Component colors don't update when theme changes  
**Solution**: Use semantic tokens (`bg-card`) instead of hard-coded values (`bg-white`)

### Input Fields Look Wrong in Dark Mode
**Issue**: Input backgrounds are too dark/light  
**Solution**: Use `bg-input-background` variable which adapts to theme

---

## Testing Checklist

Before deploying changes, test:

- [ ] Theme toggle works on login screen
- [ ] Theme toggle works on all dashboard routes
- [ ] Theme preference persists after refresh
- [ ] All text is readable in both modes
- [ ] Cards and borders are visible in both modes
- [ ] Input fields have proper backgrounds
- [ ] Charts render correctly in both modes
- [ ] Gradients look good in both modes
- [ ] No flash of wrong theme on load
- [ ] Keyboard navigation works

---

## Quick Reference

### Available Theme Tokens

**Backgrounds**: `background`, `card`, `popover`, `muted`, `accent`  
**Text**: `foreground`, `muted-foreground`, `accent-foreground`  
**Borders**: `border`, `input`  
**Interactive**: `primary`, `secondary`, `destructive`  
**Charts**: `chart-1` through `chart-5`  
**Sidebar**: `sidebar`, `sidebar-border`, `sidebar-accent`

### Common Patterns

```tsx
// Container
className="bg-background"

// Card
className="bg-card border-border"

// Heading
className="text-foreground"

// Muted Text
className="text-muted-foreground"

// Primary Button
className="bg-primary text-primary-foreground"

// Input
className="bg-input-background border-border"

// Hover State
className="hover:bg-accent hover:text-accent-foreground"
```

---

**Last Updated**: May 2026  
**Next-Themes Version**: 0.4.6
