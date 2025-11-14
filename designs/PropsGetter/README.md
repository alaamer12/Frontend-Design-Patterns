# Props Getter Pattern in React

## Overview

The Props Getter pattern provides functions that return props objects, allowing consumers to easily apply consistent props to elements while maintaining flexibility to override or extend them. This pattern is commonly used in accessible component libraries and form management tools.

## Why Use Props Getter?

- **Consistency**: Ensures consistent prop application across elements
- **Accessibility**: Automatically includes ARIA attributes
- **Flexibility**: Easy to override or extend returned props
- **Reduced Boilerplate**: Less repetitive code
- **Better DX**: Clear, intuitive API
- **Composability**: Easy to compose multiple prop getters

## Basic Pattern

```jsx
function useDropdown({ defaultOpen = false } = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Props getter function
  const getToggleButtonProps = (props = {}) => ({
    onClick: () => setIsOpen(!isOpen),
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    ...props // Allow overrides
  });

  const getMenuProps = (props = {}) => ({
    role: 'listbox',
    style: {
      display: isOpen ? 'block' : 'none',
      ...props.style
    },
    ...props
  });

  return { isOpen, getToggleButtonProps, getMenuProps };
}

// Usage
function Dropdown({ items }) {
  const { isOpen, getToggleButtonProps, getMenuProps } = useDropdown();
  
  return (
    <div>
      <button {...getToggleButtonProps()}>
        Select an option ▼
      </button>
      <ul {...getMenuProps()}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Real-World Examples

### 1. Dropdown with Props Getters

```jsx
function useDropdown({ defaultOpen = false } = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getToggleButtonProps = (props = {}) => ({
    onClick: () => setIsOpen(!isOpen),
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox',
    ...props
  });

  const getMenuProps = (props = {}) => ({
    role: 'listbox',
    style: {
      display: isOpen ? 'block' : 'none',
      ...props.style
    },
    ...props
  });

  const getItemProps = ({ index, item }, props = {}) => ({
    role: 'option',
    'aria-selected': selectedIndex === index,
    onClick: () => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (props.onClick) props.onClick(item);
    },
    ...props
  });

  return {
    isOpen,
    selectedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps
  };
}
```

### 2. Toggle with Props Getters

```jsx
function useToggle(initialState = false) {
  const [on, setOn] = useState(initialState);

  const getTogglerProps = (props = {}) => ({
    onClick: () => setOn(!on),
    'aria-pressed': on,
    ...props
  });

  const getStatusProps = (props = {}) => ({
    'aria-live': 'polite',
    role: 'status',
    ...props
  });

  return {
    on,
    setOn,
    getTogglerProps,
    getStatusProps
  };
}

// Usage
function Toggle() {
  const { on, getTogglerProps, getStatusProps } = useToggle(false);

  return (
    <div>
      <button {...getTogglerProps()}>
        {on ? 'ON' : 'OFF'}
      </button>
      <div {...getStatusProps()}>
        The toggle is <strong>{on ? 'ON' : 'OFF'}</strong>
      </div>
    </div>
  );
}
```

### 3. Form with Props Getters

```jsx
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const getInputProps = (name, props = {}) => ({
    name,
    value: values[name] || '',
    onChange: (e) => {
      setValues({ ...values, [name]: e.target.value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    },
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    ...props
  });

  const getErrorProps = (name, props = {}) => ({
    id: `${name}-error`,
    role: 'alert',
    style: {
      color: '#e74c3c',
      fontSize: '12px',
      marginTop: '4px',
      display: errors[name] ? 'block' : 'none',
      ...props.style
    },
    ...props
  });

  const validate = (validationRules) => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    getInputProps,
    getErrorProps,
    validate,
    setErrors
  };
}

// Usage
function ContactForm() {
  const { values, getInputProps, getErrorProps, validate } = useForm({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate({
      name: (value) => !value ? 'Name is required' : null,
      email: (value) => !value ? 'Email is required' : 
             !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : null,
      message: (value) => !value ? 'Message is required' : null
    });

    if (isValid) {
      alert(`Form submitted!\n${JSON.stringify(values, null, 2)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input {...getInputProps('name', { placeholder: 'Enter your name' })} />
        <div {...getErrorProps('name')}>Name is required</div>
      </div>
      
      <div>
        <label>Email:</label>
        <input {...getInputProps('email', { type: 'email' })} />
        <div {...getErrorProps('email')}>Valid email is required</div>
      </div>
      
      <div>
        <label>Message:</label>
        <textarea {...getInputProps('message', { rows: 4 })} />
        <div {...getErrorProps('message')}>Message is required</div>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Best Practices

### 1. Always Accept Props Parameter

```jsx
// ✅ Good - Accepts props for overrides
const getButtonProps = (props = {}) => ({
  onClick: handleClick,
  ...props
});

// ❌ Bad - No way to override
const getButtonProps = () => ({
  onClick: handleClick
});
```

### 2. Spread User Props Last

```jsx
// ✅ Good - User props can override defaults
const getButtonProps = (props = {}) => ({
  onClick: handleClick,
  disabled: false,
  ...props // User can override disabled
});

// ❌ Bad - User props are overridden
const getButtonProps = (props = {}) => ({
  ...props,
  onClick: handleClick, // Always overrides user's onClick
  disabled: false
});
```

### 3. Include Accessibility Attributes

```jsx
// ✅ Good - Includes ARIA attributes
const getToggleProps = (props = {}) => ({
  onClick: toggle,
  'aria-pressed': isPressed,
  'aria-label': 'Toggle button',
  role: 'switch',
  ...props
});

// ❌ Bad - Missing accessibility
const getToggleProps = (props = {}) => ({
  onClick: toggle,
  ...props
});
```

### 4. Compose Event Handlers

```jsx
// ✅ Good - Calls both handlers
const getButtonProps = (props = {}) => ({
  onClick: (e) => {
    handleClick(e);
    props.onClick?.(e);
  },
  ...props
});

// ❌ Bad - Overwrites user's handler
const getButtonProps = (props = {}) => ({
  onClick: handleClick,
  ...props
});
```

### 5. Document Return Values

```jsx
/**
 * Returns props for the toggle button
 * 
 * @param {Object} props - Additional props to merge
 * @returns {Object} Props object with onClick, aria-pressed, etc.
 * 
 * @example
 * <button {...getToggleProps({ className: 'my-button' })} />
 */
const getToggleProps = (props = {}) => ({
  onClick: toggle,
  'aria-pressed': isPressed,
  ...props
});
```

## Common Patterns

### 1. Nested Props Getters

```jsx
function useCombobox() {
  const getInputProps = (props = {}) => ({
    role: 'combobox',
    'aria-expanded': isOpen,
    ...props
  });

  const getListboxProps = (props = {}) => ({
    role: 'listbox',
    hidden: !isOpen,
    ...props
  });

  const getOptionProps = (index, props = {}) => ({
    role: 'option',
    'aria-selected': selectedIndex === index,
    onClick: () => selectOption(index),
    ...props
  });

  return { getInputProps, getListboxProps, getOptionProps };
}
```

### 2. Conditional Props

```jsx
function useInput({ type = 'text' }) {
  const getInputProps = (props = {}) => {
    const baseProps = {
      type,
      value,
      onChange: handleChange,
      ...props
    };

    // Add type-specific props
    if (type === 'number') {
      return { ...baseProps, min: 0, max: 100 };
    }

    return baseProps;
  };

  return { getInputProps };
}
```

### 3. Style Merging

```jsx
function useModal() {
  const getOverlayProps = (props = {}) => ({
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      ...props.style // Merge user styles
    },
    ...props
  });

  return { getOverlayProps };
}
```

## Testing Strategy

### Testing Props Getters

```jsx
describe('useToggle', () => {
  it('returns correct props from getter', () => {
    const { result } = renderHook(() => useToggle());
    const props = result.current.getTogglerProps();
    
    expect(props).toHaveProperty('onClick');
    expect(props).toHaveProperty('aria-pressed');
    expect(props['aria-pressed']).toBe(false);
  });

  it('allows prop overrides', () => {
    const { result } = renderHook(() => useToggle());
    const customClick = jest.fn();
    const props = result.current.getTogglerProps({ 
      onClick: customClick,
      className: 'custom'
    });
    
    expect(props.className).toBe('custom');
  });

  it('composes event handlers', () => {
    const { result } = renderHook(() => useToggle());
    const customClick = jest.fn();
    const props = result.current.getTogglerProps({ onClick: customClick });
    
    act(() => {
      props.onClick();
    });
    
    expect(result.current.on).toBe(true);
    expect(customClick).toHaveBeenCalled();
  });
});
```

### Testing Components Using Props Getters

```jsx
describe('Dropdown', () => {
  it('applies props from getter', () => {
    render(<Dropdown items={['Item 1', 'Item 2']} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('allows custom props', () => {
    const { getToggleButtonProps } = useDropdown();
    const props = getToggleButtonProps({ 
      className: 'custom-button',
      id: 'my-dropdown'
    });
    
    expect(props.className).toBe('custom-button');
    expect(props.id).toBe('my-dropdown');
  });
});
```

## When to Use This Pattern

✅ **Good for:**
- Accessible component libraries
- Complex components with many props
- Keyboard navigation
- ARIA attribute management
- Consistent prop application
- Form management
- Dropdown/combobox components

❌ **Consider alternatives for:**
- Simple components with few props
- No accessibility requirements
- Performance-critical code (extra function calls)
- When props are straightforward
- Components with no shared behavior

## Common Pitfalls

1. **Not accepting props parameter**: Always allow overrides
2. **Wrong spread order**: User props should come last
3. **Missing accessibility**: Include ARIA attributes
4. **Not composing handlers**: Call both internal and user handlers
5. **Poor documentation**: Document what props are returned
6. **Over-engineering**: Don't use for simple cases
7. **Forgetting defaults**: Provide sensible default values

## Integration with Other Patterns

- **Custom Hooks**: Props getters are often part of custom hooks
- **Compound Components**: Use props getters in compound components
- **Render Props**: Can be combined with render props
- **Controlled Props**: Works well with controlled components
- **Accessibility**: Essential for accessible components

## Popular Libraries Using This Pattern

- **Downshift**: Extensive use of props getters for accessible dropdowns
- **React Table**: Column and row prop getters
- **React Hook Form**: Controller prop getters
- **Reach UI**: Accessible components with prop getters
- **React Aria**: Adobe's accessible component library

## Advantages

1. **Consistency**: Ensures consistent prop application
2. **Flexibility**: Easy to override or extend
3. **Accessibility**: Automatically includes ARIA attributes
4. **Composability**: Easy to compose multiple getters
5. **Testability**: Easy to test prop generation
6. **Documentation**: Clear API surface

## Disadvantages

1. **Learning Curve**: Requires understanding the pattern
2. **Verbosity**: More code than direct prop passing
3. **Performance**: Extra function calls (usually negligible)
4. **Debugging**: Can be harder to trace prop sources
5. **Type Safety**: Requires careful TypeScript typing

## Summary

The Props Getter pattern provides a powerful, flexible way to apply consistent props to elements while maintaining the ability to override or extend them. It's especially valuable for building accessible component libraries where ARIA attributes and keyboard navigation are essential. By returning props objects from functions, you give users control while ensuring consistency and accessibility.

This pattern is widely used in popular libraries like Downshift and React Table, and is considered a best practice for building flexible, accessible React components.
