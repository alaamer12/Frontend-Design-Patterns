# Provider Pattern in React

## Overview

The Provider pattern uses React Context to share data and functionality across the component tree without prop drilling. It's the foundation for global state management in React applications.

## Why Use Provider Pattern?

- **Avoid Prop Drilling**: No need to pass props through intermediate components
- **Global State**: Share state across unrelated components
- **Clean Code**: Cleaner component hierarchy
- **Scalable**: Easy to add new global state
- **Composable**: Multiple providers can be nested

## Basic Pattern

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Usage
<ThemeProvider>
  <App />
</ThemeProvider>
```

## When to Use

✅ Global state (theme, auth, language)
✅ Avoiding prop drilling
✅ Shared functionality
✅ Configuration management

❌ Local component state
❌ Frequently changing data (performance)
❌ Simple parent-child communication

## Summary

Provider Pattern is essential for managing global state in React. Use Context API to share data across your component tree efficiently.
