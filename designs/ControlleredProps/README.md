# Controlled Props Pattern in React

## Overview

The Controlled Props pattern allows components to work in both controlled and uncontrolled modes. In controlled mode, the parent component manages the state. In uncontrolled mode, the component manages its own internal state. This pattern provides maximum flexibility for component consumers.

## Why Use Controlled Props?

- **Flexibility**: Components can work in multiple modes based on use case
- **Single Source of Truth**: In controlled mode, parent has complete control
- **Validation**: Easy to validate and transform input in controlled mode
- **Simplicity**: Uncontrolled mode requires less boilerplate
- **Library Standard**: Common pattern in popular UI libraries (Material-UI, Ant Design)

## The Three Approaches

### 1. Controlled Components

A controlled component receives its state as props from a parent component. The parent manages all state changes.

**Example: A controlled input component**

```jsx
// Controlled Input
const ControlledInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} />
);

// Parent manages state
const Parent = () => {
  const [value, setValue] = useState('');
  
  return (
    <ControlledInput 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
};
```

**Characteristics:**
- Parent manages state
- Single source of truth
- Easy to validate/transform
- More predictable behavior
- Requires more boilerplate

### 2. Uncontrolled Components

An uncontrolled component manages its own internal state. The parent can access the value using refs or callbacks.

**Example: An uncontrolled input component**

```jsx
// Uncontrolled Input
const UncontrolledInput = ({ defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue || '');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };
  
  return <input type="text" value={value} onChange={handleChange} />;
};

// Parent doesn't manage state
const Parent = () => (
  <UncontrolledInput 
    defaultValue="Hello" 
    onValueChange={(val) => console.log(val)} 
  />
);
```

**Characteristics:**
- Component manages its own state
- Less code to write
- Good for simple forms
- Uses refs for direct access
- Less predictable

### 3. Flexible (Hybrid) Components

A flexible component can work in both modes by checking if a controlled prop is provided.

**Example: A flexible input component**

```jsx
const FlexibleInput = ({ 
  value: controlledValue, 
  defaultValue = '', 
  onChange 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  // Check if component is controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) onChange(e);
  };
  
  return <input type="text" value={value} onChange={handleChange} />;
};

// Can be used in both modes
// Controlled:
<FlexibleInput value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled:
<FlexibleInput defaultValue="Hello" onChange={(e) => console.log(e.target.value)} />
```

**Characteristics:**
- Works in both modes
- Maximum flexibility
- Common in UI libraries
- More complex to implement
- Best for reusable components

## Real-World Examples

### Form Input with Validation

```jsx
const ValidatedInput = ({ value, onChange, validate }) => {
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    const validationError = validate ? validate(newValue) : '';
    setError(validationError);
    onChange(e);
  };
  
  return (
    <div>
      <input value={value} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

// Usage
const [email, setEmail] = useState('');

<ValidatedInput
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  validate={(val) => !val.includes('@') ? 'Invalid email' : ''}
/>
```

### Toggle Component

```jsx
const Toggle = ({ checked: controlledChecked, defaultChecked = false, onChange }) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  
  const handleToggle = () => {
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    if (onChange) onChange(newChecked);
  };
  
  return (
    <button onClick={handleToggle}>
      {checked ? 'ON' : 'OFF'}
    </button>
  );
};

// Controlled
<Toggle checked={isOn} onChange={setIsOn} />

// Uncontrolled
<Toggle defaultChecked={true} onChange={(val) => console.log(val)} />
```

### Select Component

```jsx
const Select = ({ value, defaultValue, onChange, options }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) onChange(e);
  };
  
  return (
    <select value={currentValue} onChange={handleChange}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
```

## Best Practices

### 1. Decide on Control Mode Early

```jsx
// ✅ Good - Clear control mode
const isControlled = value !== undefined;

// ❌ Bad - Ambiguous
const isControlled = value || defaultValue;
```

### 2. Don't Switch Between Modes

```jsx
// ❌ Bad - Switching from uncontrolled to controlled
const [value, setValue] = useState(undefined);

// Later...
setValue('some value'); // Now it's controlled!

// ✅ Good - Consistent mode
const [value, setValue] = useState(''); // Always controlled
```

### 3. Warn About Mode Switching

```jsx
useEffect(() => {
  if (process.env.NODE_ENV !== 'production') {
    const wasControlled = prevIsControlled.current;
    const isControlled = value !== undefined;
    
    if (wasControlled !== isControlled) {
      console.warn(
        'Component is changing from ' +
        (wasControlled ? 'controlled' : 'uncontrolled') +
        ' to ' +
        (isControlled ? 'controlled' : 'uncontrolled')
      );
    }
  }
}, [value]);
```

### 4. Provide Clear Prop Names

```jsx
// ✅ Good - Clear naming
<Input 
  value={value}           // Controlled
  defaultValue="hello"    // Uncontrolled
  onChange={handleChange}
/>

// ❌ Bad - Confusing naming
<Input 
  val={value}
  initialValue="hello"
  onUpdate={handleChange}
/>
```

### 5. Document the Behavior

```jsx
/**
 * Input component that can work in both controlled and uncontrolled modes.
 * 
 * @param {string} [value] - Controlled value. If provided, component is controlled.
 * @param {string} [defaultValue] - Initial value for uncontrolled mode.
 * @param {Function} [onChange] - Called when value changes.
 * 
 * @example
 * // Controlled
 * <Input value={value} onChange={(e) => setValue(e.target.value)} />
 * 
 * // Uncontrolled
 * <Input defaultValue="Hello" onChange={(e) => console.log(e.target.value)} />
 */
```

## Common Patterns

### 1. Form Field Pattern

```jsx
const FormField = ({ 
  value, 
  defaultValue = '', 
  onChange, 
  label, 
  error 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };
  
  return (
    <div className="form-field">
      <label>{label}</label>
      <input value={currentValue} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
```

### 2. Checkbox Pattern

```jsx
const Checkbox = ({ 
  checked, 
  defaultChecked = false, 
  onChange, 
  label 
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
  const handleChange = (e) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    if (onChange) onChange(e);
  };
  
  return (
    <label>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleChange} 
      />
      {label}
    </label>
  );
};
```

### 3. Multi-Select Pattern

```jsx
const MultiSelect = ({ 
  value, 
  defaultValue = [], 
  onChange, 
  options 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalValue;
  
  const handleToggle = (optionValue) => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter(v => v !== optionValue)
      : [...selected, optionValue];
    
    if (!isControlled) setInternalValue(newSelected);
    if (onChange) onChange(newSelected);
  };
  
  return (
    <div>
      {options.map(opt => (
        <label key={opt.value}>
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => handleToggle(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};
```

## Testing Strategy

### Testing Controlled Mode

```jsx
describe('Input - Controlled Mode', () => {
  it('uses provided value', () => {
    const { rerender } = render(
      <Input value="hello" onChange={jest.fn()} />
    );
    
    expect(screen.getByRole('textbox')).toHaveValue('hello');
    
    rerender(<Input value="world" onChange={jest.fn()} />);
    
    expect(screen.getByRole('textbox')).toHaveValue('world');
  });
  
  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="hello" onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'world' }
    });
    
    expect(handleChange).toHaveBeenCalled();
  });
});
```

### Testing Uncontrolled Mode

```jsx
describe('Input - Uncontrolled Mode', () => {
  it('uses defaultValue', () => {
    render(<Input defaultValue="hello" />);
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });
  
  it('manages its own state', () => {
    render(<Input defaultValue="hello" />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'world' } });
    
    expect(input).toHaveValue('world');
  });
});
```

### Testing Mode Switching Warning

```jsx
describe('Input - Mode Switching', () => {
  it('warns when switching from uncontrolled to controlled', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const { rerender } = render(<Input />);
    
    rerender(<Input value="controlled" onChange={jest.fn()} />);
    
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('uncontrolled to controlled')
    );
    
    spy.mockRestore();
  });
});
```

## When to Use Each Mode

### Use Controlled When:

✅ You need to validate input
✅ You need to transform input
✅ You need to sync with other state
✅ You need to disable submit until valid
✅ You need to implement complex logic

### Use Uncontrolled When:

✅ Simple forms with no validation
✅ File inputs (must be uncontrolled)
✅ Integrating with non-React code
✅ Performance is critical
✅ You want less boilerplate

### Use Flexible When:

✅ Building a reusable component library
✅ You want to support both use cases
✅ Following library standards (Material-UI, etc.)
✅ Maximum flexibility is needed

## Common Pitfalls

1. **Switching between modes**: Don't change from controlled to uncontrolled or vice versa
2. **Forgetting onChange**: Controlled components need onChange to update
3. **Using both value and defaultValue**: Choose one mode
4. **Not handling undefined**: Check if value is undefined, not falsy
5. **Mutating state directly**: Always create new state objects

## Integration with Other Patterns

- **Custom Hooks**: Extract control logic into `useControlledState` hook
- **Form Libraries**: React Hook Form, Formik use this pattern
- **Compound Components**: Can be controlled or uncontrolled
- **Render Props**: Can provide control to render function

## Popular Libraries Using This Pattern

- **React Hook Form**: Uncontrolled by default, supports controlled
- **Material-UI**: All inputs support both modes
- **Ant Design**: Flexible components with value/defaultValue
- **Chakra UI**: Controlled and uncontrolled variants

## Summary

The Controlled Props pattern provides flexibility by allowing components to work in both controlled and uncontrolled modes. Controlled mode gives parents complete control over state, while uncontrolled mode reduces boilerplate. Flexible components that support both modes are common in UI libraries and provide the best developer experience.
