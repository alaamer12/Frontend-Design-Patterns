# Render Props Pattern in React

## Overview

Render Props is a technique for sharing code between components using a prop whose value is a function. The component calls this function instead of implementing its own render logic.

## Why Use Render Props?

- **Code Reuse**: Share logic across components
- **Flexibility**: Complete control over rendering
- **Composition**: Easy to compose multiple render props
- **Clear Data Flow**: Explicit data passing
- **No Naming Conflicts**: Unlike HOCs

## Basic Pattern

```jsx
function DataProvider({ render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);
  
  return render({ data, loading });
}

// Usage
<DataProvider
  render={({ data, loading }) => (
    loading ? <Loading /> : <Display data={data} />
  )}
/>
```

## When to Use

✅ Sharing stateful logic
✅ Flexible rendering
✅ Dynamic composition
✅ Library authors

❌ Simple logic (use Custom Hooks)
❌ New projects (prefer Hooks)
❌ Performance-critical code

## Modern Alternative

Custom Hooks are now preferred for most use cases:

```jsx
function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... logic
  return { data, loading };
}

// Usage
function Component() {
  const { data, loading } = useData();
  return loading ? <Loading /> : <Display data={data} />;
}
```

## Summary

Render Props provide flexible code sharing through function props. While powerful, Custom Hooks are now the preferred approach for most scenarios.
