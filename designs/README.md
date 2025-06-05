# React Design Patterns Examples

A comprehensive collection of React design patterns with practical examples and implementations. This repository serves as both a learning resource and a reference for implementing various design patterns in React applications.

## Design Patterns Included

### 1. Atomic Components
- Breaking down UI into smallest possible components
- Promotes reusability and maintainability
- Foundation for component-based architecture

### 2. Component Composition
- Building complex UIs from simpler components
- Favoring composition over inheritance
- Creating flexible and reusable component structures

### 3. Component Injection
- Dynamically injecting components
- Flexible component rendering
- Runtime component selection

### 4. Compound Components
- Creating components that work together
- Shared state and context
- Enhanced component flexibility

### 5. Controlled Props
- Managing component state through props
- Controlled vs Uncontrolled components
- Form handling patterns

### 6. Custom Hooks
- Extracting reusable logic
- Sharing stateful logic between components
- Building composable hooks

### 7. Dependency Injection
- Managing component dependencies
- Using inversify for DI in React
- Loose coupling between components

### 8. Higher Order Components (HOC)
- Enhancing components with additional functionality
- Component logic reuse
- Cross-cutting concerns

### 9. Props Combination
- Combining multiple props patterns
- Flexible prop handling
- Enhanced component configurability

### 10. Props Getter
- Providing props through getter functions
- Customizable prop injection
- Enhanced component flexibility

### 11. Provider Pattern
- Context-based state management
- Global state handling
- Theme and configuration management

### 12. Render Props
- Component logic sharing through props
- Flexible component rendering
- Dynamic content injection

### 13. State Reducer
- Complex state management
- Custom state logic
- Enhanced state control

### 14. Stateful and Stateless Components
- Separating state management
- Pure presentation components
- Component responsibility separation

## Project Setup

This project uses:
- React 18.3.1
- Vite 5.3.4
- Dependencies:
  - axios: API calls
  - inversify: Dependency injection
  - react-di: React dependency injection utilities

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

## Project Structure

```
designs/
├── AtomicComponents/
├── ComponentComposition/
├── ComponentInjection/
├── CompoundComponents/
├── ControlleredProps/
├── CustomHook/
├── DependencyInjection/
├── HigherOrderComponents/
├── PropsCombination/
├── PropsGetter/
├── ProviderPattern/
├── RenderProps/
├── StateReducer/
├── StatefulAndStatelessComponents/
└── index.js
```

## Best Practices

1. Choose patterns based on specific use cases
2. Consider maintainability and team familiarity
3. Avoid over-engineering - simpler solutions are often better
4. Document pattern usage and implementation details
5. Consider performance implications

## Contributing

Feel free to contribute by:
1. Adding new pattern examples
2. Improving existing implementations
3. Adding documentation
4. Fixing bugs
5. Suggesting improvements

## Additional Resources

- [React Official Documentation](https://react.dev/)
- [React Design Patterns](https://reactpatterns.com/)
- [Advanced React Patterns](https://advanced-react-patterns.com/)