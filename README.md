# Frontend Design Patterns Examples

A comprehensive collection of React design patterns and best practices, implemented with modern React and Vite. This project serves as a practical guide to understanding and implementing various frontend design patterns with working examples.

## 🚀 Project Overview

This repository contains examples and implementations of various frontend design patterns, with a focus on React applications. Each pattern is implemented in a separate module with practical examples, documentation, and PDF resources to demonstrate its usage and benefits.

## 🛠️ Tech Stack

- **React**: ^18.3.1
- **Vite**: ^5.3.4
- **Dependencies**:
  - `axios`: ^1.7.3 (HTTP client for API interactions)
  - `inversify`: ^6.0.2 (Dependency injection container)
  - `react-di`: ^0.3.1 (React dependency injection utilities)

## 📁 Project Structure

```
Frontend-Design-Patterns/
├── designs/                 # Design patterns implementations
│   ├── AtomicComponents/    # Atom, Molecule, Organism pattern
│   │   ├── AtomicComponents.jsx
│   │   ├── README.md
│   │   └── React Atomic Com.pdf
│   ├── ComponentComposition/
│   ├── ComponentInjection/  # Dynamic component injection pattern
│   │   ├── ComponentInjection.jsx
│   │   ├── README.md
│   │   └── React Component Injection Pattern.pdf
│   ├── CompoundComponents/  # Components that work together with shared context
│   │   ├── CompoundComponent.jsx
│   │   ├── README.md
│   │   └── React Compound Components Pattern.pdf
│   ├── ControlleredProps/
│   ├── CustomHook/
│   ├── DependencyInjection/
│   ├── HigherOrderComponents/
│   ├── PropsCombination/
│   ├── PropsGetter/
│   ├── ProviderPattern/
│   ├── RenderProps/
│   ├── StateReducer/
│   ├── StatefulAndStatelessComponents/
│   ├── index.js             # Export file for design patterns
│   └── README.md            # Comprehensive design patterns guide
├── src/                     # Source code
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   └── assets/              # Static assets
├── public/                  # Public assets
├── index.html               # Entry HTML file
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies
```

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Frontend-Design-Patterns.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📚 Implemented Design Patterns

This repository includes the following design patterns. Each pattern has its own directory with a detailed `README.md` file and a practical example.

- [Atomic Components](./designs/AtomicComponents/README.md): A methodology for creating design systems by breaking down components into fundamental building blocks.
- [Component Composition](./designs/ComponentComposition/README.md): Building complex UIs from simpler, reusable components.
- [Component Injection](./designs/ComponentInjection/README.md): Dynamically injecting components into a host component.
- [Compound Components](./designs/CompoundComponents/README.md): Creating components that work together and share an implicit state.
- [Controlled Props](./designs/ControlleredProps/README.md): Allowing a parent component to control the state of a child component.
- [Custom Hooks](./designs/CustomHook/README.md): Extracting and reusing stateful logic from components.
- [Dependency Injection](./designs/DependencyInjection/README.md): Decoupling components by providing their dependencies from an external source.
- [Higher-Order Components](./designs/HigherOrderComponents/README.md): Reusing component logic by wrapping a component in another component.
- [Props Combination](./designs/PropsCombination/README.md): Creating flexible components by combining related props.
- [Props Getter](./designs/PropsGetter/README.md): Providing a set of props to a component through a getter function.
- [Provider Pattern](./designs/ProviderPattern/README.md): Sharing data and functionality between components without prop drilling.
- [Render Props](./designs/RenderProps/README.md): Sharing code and logic between components by passing a function as a prop.
- [State Reducer](./designs/StateReducer/README.md): Giving consumers of a component more control over its state.
- [Stateful and Stateless Components](./designs/StatefulAndStatelessComponents/README.md): Separating components into those that manage state and those that do not.

## 🧪 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### ESLint Configuration

The project uses ESLint with the following configuration:
- React plugin
- React Hooks plugin
- React Refresh plugin

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 Best Practices

When implementing design patterns:
- Choose patterns based on specific use cases
- Consider maintainability and team familiarity
- Avoid over-engineering - simpler solutions are often better
- Document pattern usage and implementation details
- Consider performance implications

## 📖 Additional Resources

Each design pattern directory includes:
- A `README.md` with a detailed explanation of the pattern.
- An example implementation of the pattern.
- A PDF document with further details, use cases, and best practices.

## 🔗 Related Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Design Patterns in JavaScript](https://www.patterns.dev/)
- [React Patterns](https://reactpatterns.com/)

## 📄 License

This project is open source and available under the MIT license.