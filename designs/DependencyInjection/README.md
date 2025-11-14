# Dependency Injection Pattern in React

## Overview

Dependency Injection is a pattern where components receive their dependencies from external sources rather than creating them internally. This promotes loose coupling and improves testability.

## Why Use Dependency Injection?

- **Loose Coupling**: Components don't depend on concrete implementations
- **Testability**: Easy to mock dependencies in tests
- **Flexibility**: Swap implementations without changing components
- **Maintainability**: Changes to dependencies don't affect components
- **Scalability**: Better for large applications

## Basic Pattern

```jsx
// Using Context for DI
const ServiceContext = createContext();

function ServiceProvider({ children, services }) {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

function useService(serviceName) {
  const services = useContext(ServiceContext);
  return services[serviceName];
}

// Usage
const services = {
  api: new ApiService(),
  logger: new LoggerService()
};

<ServiceProvider services={services}>
  <App />
</ServiceProvider>

// In component
function MyComponent() {
  const api = useService('api');
  const logger = useService('logger');
  // Use services
}
```

## Using Inversify (Advanced)

This project uses Inversify library for more advanced DI:

```jsx
import { Container } from 'inversify';
import { Provider } from 'react-di';

const container = new Container();
container.bind('MyService').to(MyServiceImpl);

<Provider container={container}>
  <App />
</Provider>
```

## When to Use

✅ Large applications
✅ Multiple implementations
✅ Complex dependencies
✅ Need for testing
✅ Microservices architecture

❌ Small applications
❌ Simple dependencies
❌ Rapid prototyping
❌ Learning React

## Modern Alternatives

For most React apps, Context API + Custom Hooks is sufficient:

```jsx
// Service Hook
function useApi() {
  return useMemo(() => new ApiService(), []);
}

// Or Context
const ApiContext = createContext();

function ApiProvider({ children }) {
  const api = useMemo(() => new ApiService(), []);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}
```

## Summary

Dependency Injection promotes loose coupling and testability. While libraries like Inversify provide advanced DI, Context API + Hooks are often sufficient for most React applications.
