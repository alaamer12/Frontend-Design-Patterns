# Component Injection Pattern in React

## Overview

Component Injection is a pattern where components are passed as props and dynamically rendered, allowing for flexible, runtime component selection. This pattern enables plugin architectures, dynamic layouts, and highly configurable component systems.

## Why Use Component Injection?

- **Dynamic Rendering**: Choose which components to render at runtime
- **Plugin Architecture**: Build extensible applications with plugin systems
- **Flexible Layouts**: Create configurable layouts without hardcoding
- **Inversion of Control**: Host components don't need to know about specific implementations
- **Runtime Configuration**: Change component behavior without code changes

## Basic Pattern

### Simple Component Injection

```jsx
function Layout({ Header, Content, Footer }) {
  return (
    <div>
      {Header && <Header />}
      <main>{Content ? <Content /> : <div>No content</div>}</main>
      {Footer && <Footer />}
    </div>
  );
}

// Usage
<Layout
  Header={MyHeader}
  Content={MyContent}
  Footer={MyFooter}
/>
```

### Plugin Host Pattern

```jsx
function PluginHost({ plugins = [] }) {
  return (
    <div>
      {plugins.map((Plugin, index) => (
        <Plugin key={index} />
      ))}
    </div>
  );
}

// Usage
<PluginHost plugins={[Plugin1, Plugin2, Plugin3]} />
```

## Real-World Examples

### Dashboard with Widgets

```jsx
function Dashboard({ widgets, layout }) {
  return (
    <div className="dashboard">
      {layout.map((position, index) => {
        const Widget = widgets[position.widgetId];
        return Widget ? (
          <div key={index} style={position.style}>
            <Widget {...position.props} />
          </div>
        ) : null;
      })}
    </div>
  );
}

// Usage
const widgets = {
  stats: StatsWidget,
  chart: ChartWidget,
  table: TableWidget
};

const layout = [
  { widgetId: 'stats', style: { gridArea: '1 / 1' }, props: {} },
  { widgetId: 'chart', style: { gridArea: '1 / 2' }, props: {} },
  { widgetId: 'table', style: { gridArea: '2 / 1 / 2 / 3' }, props: {} }
];

<Dashboard widgets={widgets} layout={layout} />
```

### Conditional Renderer

```jsx
function ConditionalRenderer({ type, components, props = {} }) {
  const Component = components[type];
  
  if (!Component) {
    return <div>Unknown component type: {type}</div>;
  }
  
  return <Component {...props} />;
}

// Usage
<ConditionalRenderer
  type="success"
  components={{
    success: SuccessMessage,
    error: ErrorMessage,
    warning: WarningMessage
  }}
  props={{ message: 'Operation successful!' }}
/>
```

### Page Builder

```jsx
function PageBuilder({ sections }) {
  const componentMap = {
    hero: HeroSection,
    features: FeaturesSection,
    testimonials: TestimonialsSection,
    cta: CTASection
  };

  return (
    <div className="page">
      {sections.map((section, index) => {
        const Component = componentMap[section.type];
        return Component ? (
          <Component key={index} {...section.props} />
        ) : null;
      })}
    </div>
  );
}

// Usage from CMS
const pageData = {
  sections: [
    { type: 'hero', props: { title: 'Welcome', subtitle: 'Get started' } },
    { type: 'features', props: { features: [...] } },
    { type: 'cta', props: { buttonText: 'Sign Up' } }
  ]
};

<PageBuilder sections={pageData.sections} />
```

## Best Practices

### 1. Validate Injected Components

```jsx
// ✅ Good - Validates component exists
function Host({ Component }) {
  if (!Component) {
    return <div>No component provided</div>;
  }
  return <Component />;
}

// ❌ Bad - No validation
function Host({ Component }) {
  return <Component />; // Crashes if undefined
}
```

### 2. Provide Default Components

```jsx
// ✅ Good - Has fallback
function Layout({ Header = DefaultHeader, Content, Footer = DefaultFooter }) {
  return (
    <div>
      <Header />
      {Content && <Content />}
      <Footer />
    </div>
  );
}

// ❌ Bad - No defaults
function Layout({ Header, Content, Footer }) {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

### 3. Pass Props Consistently

```jsx
// ✅ Good - Consistent prop passing
function PluginHost({ plugins, sharedProps = {} }) {
  return (
    <div>
      {plugins.map((Plugin, index) => (
        <Plugin key={index} {...sharedProps} />
      ))}
    </div>
  );
}

// ❌ Bad - Inconsistent
function PluginHost({ plugins }) {
  return (
    <div>
      {plugins.map((Plugin, index) => (
        <Plugin key={index} /> // No way to pass props
      ))}
    </div>
  );
}
```

### 4. Use Component Maps for Type Safety

```jsx
// ✅ Good - Centralized component map
const COMPONENT_MAP = {
  button: Button,
  input: Input,
  select: Select
};

function FormBuilder({ fields }) {
  return fields.map(field => {
    const Component = COMPONENT_MAP[field.type];
    return Component ? <Component key={field.id} {...field.props} /> : null;
  });
}

// ❌ Bad - Inline component resolution
function FormBuilder({ fields }) {
  return fields.map(field => {
    let Component;
    if (field.type === 'button') Component = Button;
    else if (field.type === 'input') Component = Input;
    // ... more conditions
    return <Component {...field.props} />;
  });
}
```

## Common Patterns

### 1. Slot Pattern

```jsx
function Card({ header, body, footer }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      {body && <div className="card-body">{body}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Usage
<Card
  header={<h2>Title</h2>}
  body={<p>Content here</p>}
  footer={<button>Action</button>}
/>
```

### 2. Registry Pattern

```jsx
class ComponentRegistry {
  constructor() {
    this.components = new Map();
  }

  register(name, component) {
    this.components.set(name, component);
  }

  get(name) {
    return this.components.get(name);
  }
}

const registry = new ComponentRegistry();
registry.register('header', Header);
registry.register('footer', Footer);

function App({ componentName }) {
  const Component = registry.get(componentName);
  return Component ? <Component /> : null;
}
```

### 3. Factory Pattern

```jsx
function createComponent(type, props) {
  const components = {
    alert: Alert,
    modal: Modal,
    toast: Toast
  };

  const Component = components[type];
  return Component ? <Component {...props} /> : null;
}

// Usage
function NotificationSystem({ notifications }) {
  return (
    <div>
      {notifications.map(notif => 
        createComponent(notif.type, notif.props)
      )}
    </div>
  );
}
```

## Testing Strategy

### Testing Injected Components

```jsx
describe('Layout', () => {
  it('renders injected header', () => {
    const MockHeader = () => <div>Mock Header</div>;
    render(<Layout Header={MockHeader} />);
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });

  it('handles missing components gracefully', () => {
    render(<Layout />);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });
});
```

### Testing Plugin Host

```jsx
describe('PluginHost', () => {
  it('renders all plugins', () => {
    const Plugin1 = () => <div>Plugin 1</div>;
    const Plugin2 = () => <div>Plugin 2</div>;
    
    render(<PluginHost plugins={[Plugin1, Plugin2]} />);
    
    expect(screen.getByText('Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
  });

  it('passes props to plugins', () => {
    const MockPlugin = ({ message }) => <div>{message}</div>;
    
    render(
      <PluginHost 
        plugins={[MockPlugin]} 
        pluginProps={{ message: 'Hello' }} 
      />
    );
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## When to Use This Pattern

✅ **Good for:**
- Plugin architectures
- CMS-driven pages
- Dynamic dashboards
- Configurable layouts
- A/B testing different components
- White-label applications

❌ **Consider alternatives for:**
- Simple, static layouts
- Components with tight coupling
- When type safety is critical (use TypeScript)
- Performance-critical rendering

## Common Pitfalls

1. **No validation**: Always check if component exists before rendering
2. **Props inconsistency**: Ensure all injected components receive necessary props
3. **Memory leaks**: Clean up injected components properly
4. **Type safety**: Use TypeScript or PropTypes for better type checking
5. **Over-engineering**: Don't use this pattern for simple cases

## Integration with Other Patterns

- **Compound Components**: Inject components into compound component slots
- **Render Props**: Combine with render props for maximum flexibility
- **Provider Pattern**: Use context to provide component registry
- **HOC**: Wrap injected components with HOCs for enhancement

## Popular Libraries Using This Pattern

- **React Router**: Route components are injected
- **React DnD**: Drag sources and drop targets are injected
- **Formik**: Field components can be injected
- **Gatsby**: Page components are dynamically loaded

## Summary

Component Injection provides a powerful way to build flexible, extensible applications. By passing components as props, you enable runtime component selection, plugin architectures, and highly configurable systems. While it adds complexity, it's invaluable for applications that need dynamic behavior and extensibility.
