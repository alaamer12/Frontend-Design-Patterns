# Stateful and Stateless Components Pattern

## Overview

This pattern separates components into two categories: Stateful (Smart/Container) components that manage state and logic, and Stateless (Dumb/Presentational) components that only render UI based on props.

## Why Use This Pattern?

- **Separation of Concerns**: Logic separated from presentation
- **Reusability**: Stateless components highly reusable
- **Testability**: Easier to test independently
- **Maintainability**: Changes to logic don't affect UI
- **Clarity**: Clear component responsibilities

## Basic Pattern

```jsx
// Stateless Component - Only renders UI
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

// Stateful Component - Manages state and logic
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  
  const handleEdit = (user) => {
    // Edit logic
  };
  
  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };
  
  if (loading) return <Loading />;
  
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## Component Types

### Stateful Components
- Manage state with useState/useReducer
- Handle business logic
- Fetch and manage data
- Pass data to stateless components

### Stateless Components
- Receive data via props
- Focus on presentation
- Highly reusable
- Easy to test

## When to Use

✅ Complex features with logic
✅ Reusable UI components
✅ Clear separation needed
✅ Team with different roles

❌ Simple components
❌ One-off components
❌ Rapid prototyping

## Modern Approach

With Hooks, the distinction is less rigid but the principle remains:

```jsx
// Logic Hook (like stateful)
function useUserManagement() {
  const [users, setUsers] = useState([]);
  // ... logic
  return { users, handleEdit, handleDelete };
}

// Presentational Component (stateless)
function UserList() {
  const { users, handleEdit, handleDelete } = useUserManagement();
  return users.map(user => <UserCard user={user} />);
}
```

## Summary

Separating stateful and stateless components creates cleaner, more maintainable code. While Hooks have made the distinction less rigid, the principle of separating logic from presentation remains valuable.
