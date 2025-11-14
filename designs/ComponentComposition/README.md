
# Component Composition in React

## Overview

Component composition is a fundamental concept in React that allows you to build complex user interfaces by combining smaller, reusable components. This pattern emphasizes a clear separation of concerns, typically by dividing components into two main categories: **container components** (smart) and **presentational components** (dumb).

## Why Use Component Composition?

- **Separation of Concerns**: Logic and presentation are clearly separated
- **Reusability**: Presentational components can be reused with different data sources
- **Testability**: Easier to test components in isolation
- **Maintainability**: Changes to UI don't affect logic and vice versa
- **Readability**: Code is more organized and easier to understand
- **Flexibility**: Easy to swap implementations without affecting the other layer

## The Two Component Types

### 1. Container Components

Container components are responsible for the logic and state management of your application. They handle tasks such as fetching data from an API, managing state, and passing data and behavior down to their children. These components are often class-based components or functional components that use hooks (e.g., `useState`, `useEffect`, `useContext`).

**Key characteristics of container components:**

- **Concerned with how things work.**
- **Manage state and logic.**
- **Fetch and pass down data.**
- **Often render presentational components.**

**Example: A container component that fetches and manages a list of users.**

```jsx
// src/components/containers/UserListContainer.jsx
import React, { useState, useEffect } from 'react';
import UserList from '../presentational/UserList';

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserList users={users} />;
};

export default UserListContainer;
```

### 2. Presentational Components

Presentational components are responsible for the look and feel of your application. They receive data and behavior as props from their parent components and are primarily concerned with rendering UI elements. These components are often functional components and are typically stateless.

**Key characteristics of presentational components:**

- **Concerned with how things look.**
- **Receive data and behavior via props.**
- **Are often stateless and functional.**
- **Can be easily reused throughout the application.**

**Example: A presentational component that renders a list of users.**

```jsx
// src/components/presentational/UserList.jsx
import React from 'react';

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

export default UserList;
```

## Note

- **Separation of Concerns**: The primary benefit of this pattern is the clear separation between logic and presentation. This makes your code easier to understand, test, and maintain.
- **Reusability**: Presentational components can be easily reused with different data sources, as they are not tied to any specific logic.
- **Flexibility**: This pattern allows you to easily swap out the UI of a component without affecting the underlying logic, and vice versa.
- **Modern React**: With the introduction of hooks, the distinction between container and presentational components has become less rigid. However, the underlying principle of separating concerns remains a valuable best practice.


## Real-World Example

### Complete User Management Feature

```jsx
// Container Component - Handles logic and state
const UserManagementContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.role === filter;
  });

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <UserManagementView 
      users={filteredUsers}
      filter={filter}
      onFilterChange={setFilter}
      onDelete={handleDelete}
    />
  );
};

// Presentational Component - Handles UI
const UserManagementView = ({ users, filter, onFilterChange, onDelete }) => (
  <div>
    <FilterBar value={filter} onChange={onFilterChange} />
    <UserGrid users={users} onDelete={onDelete} />
  </div>
);
```

## Best Practices

### 1. Keep Presentational Components Pure
```jsx
// ✅ Good - Pure presentational component
const UserCard = ({ user, onEdit }) => (
  <div>
    <h3>{user.name}</h3>
    <button onClick={() => onEdit(user.id)}>Edit</button>
  </div>
);

// ❌ Bad - Has side effects and state
const UserCard = ({ user }) => {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    logUserView(user.id); // Side effect
  }, []);
  // ...
};
```

### 2. Container Components Should Focus on Logic
```jsx
// ✅ Good - Focused on logic
const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  return <ProductList products={products} loading={loading} />;
};

// ❌ Bad - Mixed with presentation
const ProductListContainer = () => {
  // ... logic ...
  return (
    <div className="fancy-grid">
      {products.map(p => (
        <div className="card">{p.name}</div>
      ))}
    </div>
  );
};
```

### 3. Use Props for Communication
```jsx
// ✅ Good - Clear prop interface
const SearchBar = ({ value, onChange, onSubmit, placeholder }) => (
  <form onSubmit={onSubmit}>
    <input value={value} onChange={onChange} placeholder={placeholder} />
    <button type="submit">Search</button>
  </form>
);

// ❌ Bad - Accessing external state
const SearchBar = () => {
  const { searchTerm } = useContext(GlobalContext); // Tight coupling
  // ...
};
```

### 4. Handle Loading and Error States in Containers
```jsx
// ✅ Good - Container handles all states
const DataContainer = () => {
  const { data, loading, error } = useFetch('/api/data');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataView data={data} />;
};
```

## Common Patterns

### 1. List and Item Pattern
```jsx
// Container
const TodoListContainer = () => {
  const [todos, setTodos] = useState([]);
  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };
  return <TodoList todos={todos} onToggle={toggleTodo} />;
};

// Presentational
const TodoList = ({ todos, onToggle }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
    ))}
  </ul>
);

const TodoItem = ({ todo, onToggle }) => (
  <li onClick={() => onToggle(todo.id)}>
    {todo.done ? '✓' : '○'} {todo.text}
  </li>
);
```

### 2. Form Pattern
```jsx
// Container
const LoginFormContainer = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LoginForm 
      credentials={credentials}
      onChange={setCredentials}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

// Presentational
const LoginForm = ({ credentials, onChange, onSubmit, error }) => (
  <form onSubmit={onSubmit}>
    {error && <ErrorMessage>{error}</ErrorMessage>}
    <input 
      type="email"
      value={credentials.email}
      onChange={(e) => onChange({ ...credentials, email: e.target.value })}
    />
    <input 
      type="password"
      value={credentials.password}
      onChange={(e) => onChange({ ...credentials, password: e.target.value })}
    />
    <button type="submit">Login</button>
  </form>
);
```

## Modern React Considerations

### With Hooks
The distinction between container and presentational components has become less rigid with hooks, but the principle remains valuable:

```jsx
// Custom hook extracts logic (like a container)
const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return { users, loading };
};

// Component remains presentational
const UserList = () => {
  const { users, loading } = useUserData();
  
  if (loading) return <LoadingSpinner />;
  return <UserGrid users={users} />;
};
```

## Testing Strategy

### Testing Presentational Components
```jsx
describe('UserCard', () => {
  it('renders user information', () => {
    const user = { id: 1, name: 'John', email: 'john@example.com' };
    render(<UserCard user={user} />);
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const handleEdit = jest.fn();
    const user = { id: 1, name: 'John' };
    render(<UserCard user={user} onEdit={handleEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(handleEdit).toHaveBeenCalledWith(1);
  });
});
```

### Testing Container Components
```jsx
describe('UserListContainer', () => {
  it('fetches and displays users', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    jest.spyOn(api, 'fetchUsers').mockResolvedValue(mockUsers);
    
    render(<UserListContainer />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
```

## When to Use This Pattern

✅ **Good for:**
- Complex features with significant logic
- Components that need to be reused with different data
- Applications requiring extensive testing
- Teams with separate design and development roles

❌ **Consider alternatives for:**
- Simple components with minimal logic
- One-off components that won't be reused
- Rapid prototyping where structure isn't critical

## Common Pitfalls

1. **Over-separation**: Not every component needs to be split
2. **Prop drilling**: Too many layers can lead to excessive prop passing
3. **Unclear boundaries**: Mixing logic into presentational components
4. **Premature optimization**: Don't split until you need to

## Integration with Other Patterns

- **Custom Hooks**: Extract container logic into reusable hooks
- **Context API**: Avoid prop drilling in deeply nested components
- **Render Props**: Alternative way to share logic between components
- **Higher-Order Components**: Wrap presentational components with logic

## Summary

Component composition through container and presentational components provides a clear, maintainable structure for React applications. While modern hooks have made the distinction less rigid, the underlying principle of separating concerns remains a valuable best practice for building scalable applications.
