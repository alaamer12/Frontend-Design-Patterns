# Lazy Loading / Code Splitting Pattern in React

## Overview

Lazy Loading (Code Splitting) is a performance optimization pattern that splits your application into smaller chunks that are loaded on-demand. This reduces the initial bundle size and improves page load time by only loading code when it's actually needed.

## Why Use Lazy Loading?

- **Faster Initial Load**: Smaller initial bundle size
- **Better Performance**: Load only what's needed
- **Improved UX**: Users see content faster
- **Efficient Resources**: Reduce bandwidth usage
- **Scalability**: Handle large applications better
- **Progressive Enhancement**: Load features as needed

## Basic Pattern

```jsx
import { lazy, Suspense } from 'react';

// Lazy load component
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

## Real-World Examples

### 1. Route-Based Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 2. Component-Based Code Splitting

```jsx
import { lazy, Suspense, useState } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const DataTable = lazy(() => import('./DataTable'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 3. Modal/Dialog Lazy Loading

```jsx
import { lazy, Suspense, useState } from 'react';

const Modal = lazy(() => import('./Modal'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      
      {isModalOpen && (
        <Suspense fallback={null}>
          <Modal onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
```

## Best Practices

### 1. Use Route-Based Splitting

```jsx
// ✅ Good - Split by routes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// ❌ Bad - Loading everything upfront
import Home from './pages/Home';
import About from './pages/About';
```

### 2. Provide Good Loading States

```jsx
// ✅ Good - Meaningful loading UI
<Suspense fallback={<SkeletonLoader />}>
  <Dashboard />
</Suspense>

// ❌ Bad - Generic or no fallback
<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

### 3. Split Heavy Components

```jsx
// ✅ Good - Split heavy components
const RichTextEditor = lazy(() => import('./RichTextEditor'));
const ChartLibrary = lazy(() => import('./ChartLibrary'));

// ❌ Bad - Loading small components lazily
const Button = lazy(() => import('./Button')); // Too small!
```

### 4. Handle Errors

```jsx
// ✅ Good - Error boundary for lazy components
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 5. Preload When Possible

```jsx
// ✅ Good - Preload on hover
const Dashboard = lazy(() => import('./Dashboard'));

function NavLink() {
  const preload = () => {
    const component = import('./Dashboard');
  };
  
  return (
    <Link 
      to="/dashboard" 
      onMouseEnter={preload}
    >
      Dashboard
    </Link>
  );
}
```

## Common Patterns

### 1. Named Exports

```jsx
// Component.jsx
export function MyComponent() { /* ... */ }

// App.jsx
const MyComponent = lazy(() => 
  import('./Component').then(module => ({
    default: module.MyComponent
  }))
);
```

### 2. Retry Logic

```jsx
function lazyWithRetry(importFn, retries = 3) {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      importFn()
        .then(resolve)
        .catch((error) => {
          if (retries === 0) {
            reject(error);
            return;
          }
          setTimeout(() => {
            lazyWithRetry(importFn, retries - 1)
              .then(resolve)
              .catch(reject);
          }, 1000);
        });
    });
  });
}

const Dashboard = lazyWithRetry(() => import('./Dashboard'));
```

### 3. Conditional Loading

```jsx
function App() {
  const [userRole, setUserRole] = useState('user');
  
  const AdminPanel = lazy(() => import('./AdminPanel'));
  const UserDashboard = lazy(() => import('./UserDashboard'));
  
  return (
    <Suspense fallback={<Loading />}>
      {userRole === 'admin' ? <AdminPanel /> : <UserDashboard />}
    </Suspense>
  );
}
```

## Loading States

### 1. Spinner

```jsx
function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="spinner-circle" />
      <p>Loading...</p>
    </div>
  );
}
```

### 2. Skeleton Loader

```jsx
function SkeletonLoader() {
  return (
    <div className="skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
      <div className="skeleton-footer" />
    </div>
  );
}
```

### 3. Progressive Loading

```jsx
function ProgressiveLoader({ progress }) {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

## Testing Strategy

```jsx
describe('Lazy Loading', () => {
  it('shows fallback while loading', () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('renders component after loading', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Component Content')).toBeInTheDocument();
    });
  });
});
```

## When to Use

✅ **Good for:**
- Route components
- Heavy third-party libraries
- Modals and dialogs
- Admin panels
- Charts and visualizations
- Rich text editors
- Large feature modules

❌ **Avoid for:**
- Small components
- Critical above-the-fold content
- Frequently used components
- Simple UI elements

## Performance Considerations

### Bundle Size Analysis

```bash
# Analyze bundle size
npm run build -- --stats

# Use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### Metrics to Track

- **Initial Bundle Size**: Should be < 200KB
- **Time to Interactive**: Should be < 3s
- **First Contentful Paint**: Should be < 1.5s
- **Lazy Chunk Size**: Keep chunks < 100KB

## Common Pitfalls

1. **Over-splitting**: Too many small chunks
2. **No fallback**: Missing Suspense fallback
3. **Poor UX**: Generic loading states
4. **No error handling**: Missing error boundaries
5. **Splitting too early**: Premature optimization

## Integration with Other Patterns

- **Error Boundaries**: Wrap lazy components
- **Provider Pattern**: Lazy load providers
- **Route Guards**: Load based on permissions
- **HOC**: Wrap with lazy loading logic

## Browser Support

- **Modern Browsers**: Full support
- **IE11**: Requires polyfills
- **Dynamic Import**: ES2020 feature

## Summary

Lazy Loading / Code Splitting is essential for building performant React applications. By loading code on-demand, you reduce initial bundle size and improve load times. Use React.lazy() and Suspense for route-based and component-based splitting, always provide good loading states, and handle errors gracefully.
