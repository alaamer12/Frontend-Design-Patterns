# Extensible Styles Pattern in React

## Overview

Extensible Styles pattern allows components to accept and merge custom styles, providing flexibility while maintaining default styling.

## Basic Pattern

```jsx
function Button({ style, className, children }) {
  const defaultStyle = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white'
  };
  
  return (
    <button 
      style={{ ...defaultStyle, ...style }}
      className={className}
    >
      {children}
    </button>
  );
}
```

## When to Use

✅ Customizable components
✅ Theme support
✅ Style overrides
✅ Component libraries

## Summary

Extensible Styles pattern enables flexible styling by allowing style overrides while maintaining sensible defaults.
