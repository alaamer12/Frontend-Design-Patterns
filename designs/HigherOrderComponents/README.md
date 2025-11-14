# Higher-Order Components (HOC) Pattern in React

## Overview

A Higher-Order Component (HOC) is a function that takes a component and returns a new component with enhanced functionality. HOCs are a powerful pattern for reusing component logic, adding cross-cutting concerns, and composing behavior.

## Why Use HOCs?

- **Code Reuse**: Share logic across multiple components
- **Props Manipulation**: Add, modify, or filter props
- **Render Hijacking**: Control rendering behavior
- **State Abstraction**: Abstract state management
- **Cross-Cutting Concerns**: Authentication, logging, error handling

## Basic Pattern

```jsx
function withEnhancement(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add logic here
    const enhancedProps = { ...props, extra: 'data' };
    
    return <WrappedComponent {...enhancedProps} />;
  };
}

// Usage
const EnhancedComponent = withEnhancement(MyComponent);
```

## Real-World Examples

### Authentication HOC

```jsx
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner />;
    if (!user) return <Redirect to="/login" />;

    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Loading HOC

```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);
<UserListWithLoading isLoading={loading} users={users} />
```

### Error Boundary HOC

```jsx
function withErrorBoundary(WrappedComponent) {
  return class extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <ErrorFallback error={this.state.error} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Usage
const SafeComponent = withErrorBoundary(MyComponent);
```

## Best Practices

### 1. Don't Mutate the Original Component

```jsx
// ✅ Good - Returns new component
function withExtra(WrappedComponent) {
  return function Enhanced(props) {
    return <WrappedComponent {...props} extra="data" />;
  };
}

// ❌ Bad - Mutates original
function withExtra(WrappedComponent) {
  WrappedComponent.prototype.extra = 'data';
  return WrappedComponent;
}
```

### 2. Pass Unrelated Props Through

```jsx
// ✅ Good - Passes all props
function withExtra(WrappedComponent) {
  return function Enhanced(props) {
    return <WrappedComponent {...props} extra="data" />;
  };
}

// ❌ Bad - Filters props
function withExtra(WrappedComponent) {
  return function Enhanced({ someProp }) {
    return <WrappedComponent someProp={someProp} extra="data" />;
  };
}
```

### 3. Maximize Composability

```jsx
// ✅ Good - Composable HOCs
const enhance = compose(
  withAuth,
  withLoading,
  withErrorBoundary
);

const EnhancedComponent = enhance(MyComponent);

// ❌ Bad - Nested HOCs
const EnhancedComponent = withAuth(
  withLoading(
    withErrorBoundary(MyComponent)
  )
);
```

### 4. Wrap Display Name for Debugging

```jsx
// ✅ Good - Clear display name
function withExtra(WrappedComponent) {
  function Enhanced(props) {
    return <WrappedComponent {...props} extra="data" />;
  }
  
  Enhanced.displayName = `withExtra(${getDisplayName(WrappedComponent)})`;
  return Enhanced;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// ❌ Bad - No display name
function withExtra(WrappedComponent) {
  return function(props) {
    return <WrappedComponent {...props} extra="data" />;
  };
}
```

### 5. Copy Static Methods

```jsx
// ✅ Good - Preserves static methods
import hoistNonReactStatics from 'hoist-non-react-statics';

function withExtra(WrappedComponent) {
  function Enhanced(props) {
    return <WrappedComponent {...props} extra="data" />;
  }
  
  hoistNonReactStatics(Enhanced, WrappedComponent);
  return Enhanced;
}

// ❌ Bad - Loses static methods
function withExtra(WrappedComponent) {
  return function Enhanced(props) {
    return <WrappedComponent {...props} extra="data" />;
  };
}
```

## Common HOC Patterns

### 1. Props Proxy

```jsx
function withPropsProxy(WrappedComponent) {
  return function PropsProxy(props) {
    const newProps = {
      ...props,
      user: { name: 'John', role: 'admin' }
    };
    return <WrappedComponent {...newProps} />;
  };
}
```

### 2. Inheritance Inversion

```jsx
function withInheritanceInversion(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      // Manipulate the render output
      return elementsTree;
    }
  };
}
```

### 3. Conditional Rendering

```jsx
function withConditionalRender(condition) {
  return function(WrappedComponent) {
    return function Conditional(props) {
      if (!condition(props)) {
        return null;
      }
      return <WrappedComponent {...props} />;
    };
  };
}

// Usage
const withAdminOnly = withConditionalRender(
  props => props.user?.role === 'admin'
);
```

## Testing Strategy

### Testing HOCs

```jsx
describe('withAuth', () => {
  it('renders component when authenticated', () => {
    const MockComponent = () => <div>Protected Content</div>;
    const Enhanced = withAuth(MockComponent);
    
    render(<Enhanced />, {
      wrapper: ({ children }) => (
        <AuthProvider value={{ user: { id: 1 }, loading: false }}>
          {children}
        </AuthProvider>
      )
    });
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects when not authenticated', () => {
    const MockComponent = () => <div>Protected Content</div>;
    const Enhanced = withAuth(MockComponent);
    
    render(<Enhanced />, {
      wrapper: ({ children }) => (
        <AuthProvider value={{ user: null, loading: false }}>
          {children}
        </AuthProvider>
      )
    });
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
```

## When to Use HOCs

✅ **Good for:**
- Cross-cutting concerns (auth, logging, analytics)
- Props manipulation
- Conditional rendering
- Legacy codebases
- Library authors

❌ **Consider alternatives for:**
- Simple logic sharing (use Custom Hooks)
- Render customization (use Render Props)
- New projects (prefer Hooks)
- Type safety concerns (Hooks are easier to type)

## HOCs vs Modern Alternatives

### HOC Approach
```jsx
const EnhancedComponent = withAuth(withLoading(MyComponent));
```

### Custom Hook Approach (Preferred)
```jsx
function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Redirect to="/login" />;
  
  return <div>Content</div>;
}
```

## Common Pitfalls

1. **Wrapper Hell**: Too many nested HOCs
2. **Prop Name Collisions**: HOCs adding same prop names
3. **Refs Not Passed**: Need to use `React.forwardRef`
4. **Static Methods Lost**: Must manually copy or use library
5. **Performance**: Extra component layers can impact performance

## Popular Libraries Using HOCs

- **Redux**: `connect()` HOC
- **React Router**: `withRouter()` HOC
- **Material-UI**: `withStyles()` HOC
- **Relay**: `createFragmentContainer()` HOC

## Migration to Hooks

### Before (HOC)
```jsx
const EnhancedComponent = withAuth(withTheme(MyComponent));
```

### After (Hooks)
```jsx
function MyComponent() {
  const { user } = useAuth();
  const theme = useTheme();
  
  return <div>Content</div>;
}
```

## Summary

Higher-Order Components are a powerful pattern for code reuse and component enhancement. While modern React favors Custom Hooks for most use cases, HOCs remain valuable for certain scenarios, especially in legacy codebases and libraries. Understanding HOCs is essential for working with many popular React libraries and for maintaining existing code.
