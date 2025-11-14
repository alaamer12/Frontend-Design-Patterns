# Custom Hooks Pattern in React

## Overview

Custom hooks are reusable functions that encapsulate stateful logic in React. They follow the naming convention "use" + descriptive name and can call other hooks. Custom hooks allow you to extract component logic into reusable functions, promoting code reuse and separation of concerns.

## Why Use Custom Hooks?

- **Reusability**: Share stateful logic across multiple components
- **Separation of Concerns**: Extract logic from UI components
- **Testability**: Test hooks independently from components
- **Composition**: Combine hooks to create complex logic
- **Cleaner Components**: Keep components focused on rendering
- **No Wrapper Hell**: Avoid HOC and render props nesting

## Creating Custom Hooks

### Basic Structure

```jsx
import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
  const [state, setState] = useState(initialValue);
  
  // Your logic here
  
  return { state, setState };
}
```

### Rules for Custom Hooks

1. **Name must start with "use"**: `useCounter`, `useFetch`, `useAuth`
2. **Can call other hooks**: `useState`, `useEffect`, `useContext`, etc.
3. **Follow hooks rules**: Only call at top level, only in React functions
4. **Return anything**: Objects, arrays, primitives, functions

## Common Custom Hook Patterns

### 1. State Management Hook

```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
const { count, increment, decrement, reset } = useCounter(0, 1);
```

### 2. Data Fetching Hook

```jsx
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch('/api/users');
```

### 3. Local Storage Hook

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
const [name, setName] = useLocalStorage('userName', 'Guest');
```

### 4. Toggle Hook

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return [value, toggle, setTrue, setFalse];
}

// Usage
const [isOpen, toggle, open, close] = useToggle(false);
```

### 5. Debounce Hook

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
const debouncedSearch = useDebounce(searchTerm, 500);
```

### 6. Window Size Hook

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// Usage
const { width, height } = useWindowSize();
```

### 7. Previous Value Hook

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
const previousCount = usePrevious(count);
```

### 8. Media Query Hook

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches
  );
  
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);
  
  return matches;
}

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
```

## Real-World Examples

### Form Management Hook

```jsx
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (validate) {
      const fieldErrors = validate({ ...values, [name]: e.target.value });
      setErrors(fieldErrors);
    }
  };
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const formErrors = validate ? validate(values) : {};
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    }
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  };
}

// Usage
const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
  }
);
```

### Authentication Hook

```jsx
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const userData = await response.json();
    setUser(userData);
  };
  
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };
  
  return { user, loading, login, logout };
}

// Usage
const { user, loading, login, logout } = useAuth();
```

### Pagination Hook

```jsx
function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const nextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
  };
  
  const prevPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
  };
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  return {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage
  };
}

// Usage
const { currentItems, currentPage, totalPages, nextPage, prevPage } = 
  usePagination(allItems, 10);
```

## Best Practices

### 1. Name Hooks Descriptively

```jsx
// ✅ Good - Clear purpose
useUserAuthentication()
useFetchProducts()
useFormValidation()

// ❌ Bad - Unclear purpose
useData()
useStuff()
useHelper()
```

### 2. Return Consistent Data Structures

```jsx
// ✅ Good - Consistent object return
function useFetch(url) {
  return { data, loading, error, refetch };
}

// ✅ Good - Consistent array return (like useState)
function useToggle(initial) {
  return [value, toggle, setTrue, setFalse];
}

// ❌ Bad - Inconsistent returns
function useFetch(url) {
  if (loading) return { loading: true };
  if (error) return { error };
  return data; // Different structure!
}
```

### 3. Handle Cleanup Properly

```jsx
// ✅ Good - Cleanup in useEffect
function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id); // Cleanup
  }, [callback, delay]);
}

// ❌ Bad - No cleanup
function useInterval(callback, delay) {
  useEffect(() => {
    setInterval(callback, delay); // Memory leak!
  }, [callback, delay]);
}
```

### 4. Use useCallback for Functions

```jsx
// ✅ Good - Memoized functions
function useCounter(initial) {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return { count, increment };
}

// ❌ Bad - New function every render
function useCounter(initial) {
  const [count, setCount] = useState(initial);
  
  const increment = () => setCount(c => c + 1);
  
  return { count, increment };
}
```

### 5. Document Your Hooks

```jsx
/**
 * Custom hook for managing counter state
 * 
 * @param {number} initialValue - Starting count value
 * @param {number} step - Increment/decrement step
 * @returns {Object} Counter state and methods
 * 
 * @example
 * const { count, increment, decrement } = useCounter(0, 1);
 */
function useCounter(initialValue = 0, step = 1) {
  // Implementation
}
```

## Testing Custom Hooks

### Using @testing-library/react-hooks

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0, 1));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(10, 1));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(9);
  });
});
```

## When to Create a Custom Hook

✅ **Create a custom hook when:**
- Logic is used in multiple components
- Logic is complex and clutters components
- Logic involves multiple hooks
- You want to test logic independently
- You want to share logic across projects

❌ **Don't create a custom hook when:**
- Logic is used only once
- Logic is very simple (1-2 lines)
- It doesn't use any hooks
- It's just a utility function

## Common Pitfalls

1. **Not following hooks rules**: Custom hooks must follow all hooks rules
2. **Missing dependencies**: Include all dependencies in useEffect
3. **No cleanup**: Always cleanup side effects
4. **Overcomplicating**: Keep hooks focused and simple
5. **Not memoizing**: Use useCallback/useMemo when appropriate

## Integration with Other Patterns

- **Context API**: Create hooks to consume context (`useAuth`, `useTheme`)
- **Compound Components**: Share state between compound components
- **Render Props**: Replace render props with custom hooks
- **HOC**: Replace HOCs with custom hooks for cleaner code

## Popular Custom Hook Libraries

- **react-use**: Collection of essential hooks
- **ahooks**: Comprehensive React hooks library
- **usehooks-ts**: TypeScript-ready React hooks
- **react-query**: Data fetching hooks
- **swr**: Data fetching and caching hooks

## Summary

Custom hooks are one of the most powerful features in modern React. They allow you to extract and reuse stateful logic, keep components clean and focused, and create composable, testable code. By following best practices and understanding when to create custom hooks, you can significantly improve your React codebase's maintainability and reusability.
