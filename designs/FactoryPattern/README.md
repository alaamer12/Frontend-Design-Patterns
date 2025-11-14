# Factory Pattern in React

## Overview

Factory pattern provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic in a centralized location.

## Why Use Factory Pattern?

- **Encapsulation**: Object creation in one place
- **Flexibility**: Easy to add new types
- **Consistency**: Uniform creation
- **Loose Coupling**: Hide concrete classes
- **Maintainability**: Centralized changes

## Basic Pattern

```jsx
const ComponentFactory = {
  createComponent(type, props) {
    const components = {
      button: (props) => <Button {...props} />,
      input: (props) => <Input {...props} />,
      select: (props) => <Select {...props} />
    };
    
    const Component = components[type];
    return Component ? <Component {...props} /> : null;
  }
};
```

## When to Use

✅ Multiple similar object types
✅ Complex creation logic
✅ Need for consistency
✅ Runtime type selection

❌ Simple object creation
❌ Few object types
❌ No shared interface

## Summary

Factory pattern centralizes object creation, making code more maintainable and flexible while hiding implementation details from client code.
