# Proxy Pattern in React

## Overview

Proxy pattern provides a surrogate or placeholder for another object to control access to it. Useful for lazy loading, caching, access control, and logging.

## Basic Pattern

```jsx
const ImageProxy = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div>
      {!loaded && <Placeholder />}
      <img 
        src={src} 
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
};
```

## When to Use

✅ Lazy loading
✅ Caching
✅ Access control
✅ Logging/monitoring

## Summary

Proxy pattern controls access to objects, enabling lazy loading, caching, and access control while maintaining the same interface.
