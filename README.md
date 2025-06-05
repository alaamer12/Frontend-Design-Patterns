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

### 1. Atomic Components
A methodology for creating design systems by breaking down components into fundamental building blocks:
- **Atoms**: Basic UI elements like buttons, inputs, labels
- **Molecules**: Simple groups of UI elements functioning together
- **Organisms**: Complex UI components composed of molecules and atoms
- **Templates**: Page-level objects with multiple organisms

Example:
```jsx
// Atom level component
function AtomComponent({label, onClick}) {
    return (
        <button onClick={onClick}>{label}</button>
    );
}

// Molecule level component
function MoleculeComponent({label, inputType, buttonText, onButtonClicked}) {
    return (
        <div>
            <label>{label}</label>
            <input type={inputType} />
            <AtomComponent label={buttonText} onClick={onButtonClicked} />
        </div>
    );
}
```

### 2. Compound Components
Components that work together and share an implicit state using React Context:

Example:
```jsx
// Usage of the Tabs compound component
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanel index={0}>Content 1</Tabs.TabPanel>
  <Tabs.TabPanel index={1}>Content 2</Tabs.TabPanel>
</Tabs>
```

### 3. Component Injection
Dynamically injecting components into a base component structure:

Example:
```jsx
// Base component accepting component injections
<BaseComponent
  Header={() => <h1>Header Injection</h1>}
  Content={() => <h1>Content Injection</h1>}
  Footer={() => <h1>Footer Injection</h1>}
/>

// Plugin host pattern
<PluginHost
  plugins={[
    () => <h1>Plugin 1</h1>,
    () => <h1>Plugin 2</h1>,
    () => <h1>Plugin 3</h1>,
  ]}
/>
```

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
- README with explanation
- Example implementation
- PDF documentation with detailed explanations
- Use cases and best practices

## 🔗 Related Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Design Patterns in JavaScript](https://www.patterns.dev/)
- [React Patterns](https://reactpatterns.com/)

## 📄 License

This project is open source and available under the MIT license.
