# Props Combination Pattern in React

## Overview

Props Combination is a pattern where you create flexible components by combining related props to generate different variants without creating multiple similar components. This pattern reduces code duplication and provides a clean API for component consumers.

## Why Use Props Combination?

- **Flexibility**: Create many variants from a single component
- **Maintainability**: Single source of truth for component logic
- **Reduced Duplication**: Avoid creating similar components
- **Clear API**: Intuitive prop combinations
- **Extensibility**: Easy to add new variants

## Basic Pattern

```jsx
function Button({ variant = 'primary', size = 'medium', children }) {
  const variantStyles = {
    primary: { backgroundColor: '#3498db', color: 'white' },
    secondary: { backgroundColor: '#95a5a6', color: 'white' },
    danger: { backgroundColor: '#e74c3c', color: 'white' }
  };

  const sizeStyles = {
    small: { padding: '6px 12px', fontSize: '12px' },
    medium: { padding: '10px 20px', fontSize: '14px' },
    large: { padding: '14px 28px', fontSize: '16px' }
  };

  return (
    <button style={{ ...variantStyles[variant], ...sizeStyles[size] }}>
      {children}
    </button>
  );
}

// Usage - Combine variant and size
<Button variant="primary" size="large">Click Me</Button>
<Button variant="danger" size="small">Delete</Button>
```

## Real-World Examples

### Alert Component

```jsx
function Alert({ type = 'info', dismissible = false, icon = true, children }) {
  const typeConfig = {
    success: { bg: '#d4edda', color: '#155724', icon: '✓' },
    error: { bg: '#f8d7da', color: '#721c24', icon: '✗' },
    warning: { bg: '#fff3cd', color: '#856404', icon: '⚠' },
    info: { bg: '#d1ecf1', color: '#0c5460', icon: 'ℹ' }
  };

  const config = typeConfig[type];

  return (
    <div style={{ backgroundColor: config.bg, color: config.color, padding: '12px' }}>
      {icon && <span>{config.icon}</span>}
      {children}
      {dismissible && <button onClick={() => {}}>×</button>}
    </div>
  );
}

// Usage
<Alert type="success" dismissible icon>Operation successful!</Alert>
<Alert type="error" dismissible={false}>Error occurred</Alert>
```

### Card Component

```jsx
function Card({ 
  variant = 'default', 
  hoverable = false, 
  clickable = false,
  elevated = false,
  children 
}) {
  const variants = {
    default: { border: '1px solid #ddd', boxShadow: 'none' },
    outlined: { border: '2px solid #3498db', boxShadow: 'none' },
    filled: { border: 'none', backgroundColor: '#f8f9fa' }
  };

  const style = {
    ...variants[variant],
    padding: '20px',
    borderRadius: '8px',
    cursor: clickable ? 'pointer' : 'default',
    boxShadow: elevated ? '0 4px 8px rgba(0,0,0,0.1)' : variants[variant].boxShadow,
    transition: hoverable ? 'transform 0.2s' : 'none'
  };

  return <div style={style}>{children}</div>;
}

// Usage
<Card variant="outlined" hoverable elevated>Hover me!</Card>
<Card variant="filled" clickable>Click me!</Card>
```

## Best Practices

### 1. Use Meaningful Prop Names

```jsx
// ✅ Good - Clear prop names
<Button variant="primary" size="large" fullWidth />

// ❌ Bad - Unclear prop names
<Button type="1" sz="lg" fw />
```

### 2. Provide Sensible Defaults

```jsx
// ✅ Good - Has defaults
function Button({ variant = 'primary', size = 'medium', children }) {
  // ...
}

// ❌ Bad - No defaults
function Button({ variant, size, children }) {
  // variant and size could be undefined
}
```

### 3. Document Prop Combinations

```jsx
/**
 * Button component with multiple variants and sizes
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'danger'} props.variant - Button style variant
 * @param {'small'|'medium'|'large'} props.size - Button size
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button shows loading state
 * @param {boolean} props.fullWidth - Whether button takes full width
 */
function Button({ variant, size, disabled, loading, fullWidth, children }) {
  // ...
}
```

### 4. Validate Prop Combinations

```jsx
// ✅ Good - Validates combinations
function Button({ variant, size, children }) {
  if (variant === 'link' && size === 'large') {
    console.warn('Link variant does not support large size');
  }
  // ...
}

// Or use PropTypes
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
```

## Common Patterns

### 1. Boolean Flags Pattern

```jsx
function Input({ 
  error = false, 
  disabled = false, 
  required = false,
  fullWidth = false 
}) {
  return (
    <input
      className={`
        ${error ? 'input-error' : ''}
        ${disabled ? 'input-disabled' : ''}
        ${required ? 'input-required' : ''}
        ${fullWidth ? 'input-full-width' : ''}
      `}
    />
  );
}
```

### 2. Variant + Modifier Pattern

```jsx
function Badge({ 
  variant = 'default',  // Base style
  size = 'medium',      // Size modifier
  rounded = false,      // Shape modifier
  outlined = false      // Style modifier
}) {
  // Combine all modifiers
}
```

### 3. Compound Props Pattern

```jsx
function Table({ 
  striped = false,
  bordered = false,
  hoverable = false,
  compact = false,
  responsive = false 
}) {
  const className = [
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hoverable && 'table-hover',
    compact && 'table-compact',
    responsive && 'table-responsive'
  ].filter(Boolean).join(' ');

  return <table className={className}>{children}</table>;
}
```

## Testing Strategy

```jsx
describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary btn-medium');
  });

  it('combines variant and size props', () => {
    render(<Button variant="danger" size="large">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger btn-large');
  });

  it('handles multiple boolean flags', () => {
    render(<Button disabled loading fullWidth>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-loading btn-full-width');
  });
});
```

## When to Use This Pattern

✅ **Good for:**
- Components with multiple visual variants
- UI component libraries
- Design systems
- Configurable components
- Reducing component duplication

❌ **Consider alternatives for:**
- Components with complex logic
- When variants are very different
- When type safety is critical (consider separate components)
- Simple components with few variations

## Common Pitfalls

1. **Too many props**: Keep prop combinations manageable
2. **Invalid combinations**: Validate incompatible prop combinations
3. **Poor defaults**: Always provide sensible defaults
4. **Unclear naming**: Use descriptive prop names
5. **Missing documentation**: Document all prop combinations

## Integration with Other Patterns

- **Compound Components**: Use props combination within compound components
- **Render Props**: Combine with render props for maximum flexibility
- **Custom Hooks**: Extract prop combination logic into hooks
- **Atomic Design**: Use for atoms and molecules

## Popular Libraries Using This Pattern

- **Material-UI**: Button, TextField, etc.
- **Ant Design**: All components use prop combinations
- **Chakra UI**: Extensive use of variant props
- **Bootstrap React**: className combinations

## Summary

Props Combination is a powerful pattern for creating flexible, reusable components. By combining related props, you can create many variants from a single component, reducing code duplication and providing a clean, intuitive API. This pattern is essential for building component libraries and design systems.
