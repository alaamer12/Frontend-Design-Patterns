
# Compound Components in React

## Overview

Compound components are a pattern where multiple components work together to form a complete UI component. They share implicit state through React Context, providing a flexible and expressive API that gives consumers control over rendering while maintaining encapsulated logic.

## Why Use Compound Components?

- **Flexible API**: Consumers control the structure and composition
- **Implicit State Sharing**: No need to manually pass props between siblings
- **Separation of Concerns**: Logic is encapsulated, presentation is flexible
- **Inversion of Control**: Users decide how to compose the components
- **Better DX**: More intuitive and declarative API
- **Reduced Prop Drilling**: Context eliminates intermediate prop passing

## Compound Components

A compound component is a component that contains other components, and these child components are related to their parent. This pattern is particularly useful for building UI libraries and utility components, as it excels at gathering and separating concerns.

**Key characteristics of compound components:**

- **Shared State:** The parent component manages the state and shares it with its children implicitly.
- **Declarative API:** The API for the component is declarative and easy to understand.
- **Separation of Concerns:** The parent component handles the logic, while the child components handle the presentation.

### Example: A Custom Select Component

A common use case for compound components is creating a custom `Select` component. The `Select` component manages the state of the dropdown (i.e., whether it's open or closed), and the `Option` components are responsible for rendering the individual options.

```jsx
// src/components/CustomSelect.jsx
import React, { useState, useContext, createContext } from 'react';

const SelectContext = createContext();

const Select = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <SelectContext.Provider value={{ isOpen, selectedOption, setSelectedOption, toggleOpen }}>
      <div className="select-container">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { toggleOpen } = useContext(SelectContext);
  return <div onClick={toggleOpen}>{children}</div>;
};

const List = ({ children }) => {
  const { isOpen } = useContext(SelectContext);
  return isOpen ? <ul>{children}</ul> : null;
};

const Option = ({ value, children }) => {
  const { setSelectedOption, toggleOpen } = useContext(SelectContext);

  const handleClick = () => {
    setSelectedOption(value);
    toggleOpen();
  };

  return <li onClick={handleClick}>{children}</li>;
};

Select.Trigger = Trigger;
Select.List = List;
Select.Option = Option;

export default Select;
```

### Usage

Here's how you would use the `CustomSelect` component in your application:

```jsx
// src/App.jsx
import React from 'react';
import Select from './components/CustomSelect';

const App = () => (
  <div>
    <h1>Custom Select</h1>
    <Select>
      <Select.Trigger>
        <span>Select an option</span>
      </Select.Trigger>
      <Select.List>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.List>
    </Select>
  </div>
);

export default App;
```

## Note

- **Improved Readability:** Compound components make your code more readable and easier to understand.
- **Encapsulation:** The internal state of the component is encapsulated within the parent component, which makes it easier to reason about.
- **Flexibility:** This pattern allows you to create flexible and reusable components that can be easily customized.


## Real-World Examples

### 1. Accordion Component
```jsx
<Accordion>
  <Accordion.Item>
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Panel>Content for section 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Header>Section 2</Accordion.Header>
    <Accordion.Panel>Content for section 2</Accordion.Panel>
  </Accordion.Item>
</Accordion>
```

### 2. Modal Component
```jsx
<Modal>
  <Modal.Trigger>
    <button>Open Modal</button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content here</Modal.Body>
    <Modal.Footer>
      <Modal.Close>Close</Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### 3. Menu Component
```jsx
<Menu>
  <Menu.Button>Options</Menu.Button>
  <Menu.List>
    <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
    <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
    <Menu.Divider />
    <Menu.Item onSelect={() => {}}>Share</Menu.Item>
  </Menu.List>
</Menu>
```

## Implementation Patterns

### Basic Pattern with Context
```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ToggleContext = createContext();

// 2. Create parent component
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 3. Create child components
function ToggleButton({ children }) {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>{children}</button>;
}

function ToggleStatus() {
  const { on } = useContext(ToggleContext);
  return <span>{on ? 'ON' : 'OFF'}</span>;
}

// 4. Attach to parent
Toggle.Button = ToggleButton;
Toggle.Status = ToggleStatus;

// 5. Usage
<Toggle>
  <Toggle.Button>Toggle</Toggle.Button>
  <Toggle.Status />
</Toggle>
```

### Advanced Pattern with Custom Hook
```jsx
// Custom hook for better error handling
const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('Toggle components must be used within Toggle');
  }
  return context;
};

// Use in child components
function ToggleButton({ children }) {
  const { toggle } = useToggleContext();
  return <button onClick={toggle}>{children}</button>;
}
```

## Best Practices

### 1. Use Context for State Sharing
```jsx
// ✅ Good - Uses context
const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// ❌ Bad - Requires manual prop passing
function Tabs({ children, activeTab, setActiveTab }) {
  return React.Children.map(children, child =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );
}
```

### 2. Provide Clear Error Messages
```jsx
// ✅ Good - Helpful error message
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      'Tabs compound components must be used within a Tabs component. ' +
      'Wrap your components in <Tabs>...</Tabs>'
    );
  }
  return context;
};

// ❌ Bad - Generic or no error
const useTabsContext = () => {
  return useContext(TabsContext); // Could be undefined
};
```

### 3. Attach Components to Parent
```jsx
// ✅ Good - Clear namespace
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// Usage is clear
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab>...</Tabs.Tab>
  </Tabs.TabList>
</Tabs>

// ❌ Bad - Separate exports
export { Tabs, TabList, Tab, TabPanel };

// Unclear relationship
<Tabs>
  <TabList>
    <Tab>...</Tab>
  </TabList>
</Tabs>
```

### 4. Keep Components Flexible
```jsx
// ✅ Good - Flexible composition
<Tabs>
  <div className="custom-wrapper">
    <Tabs.TabList>
      <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
      <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
    </Tabs.TabList>
  </div>
  <Tabs.TabPanel index={0}>Content 1</Tabs.TabPanel>
  <Tabs.TabPanel index={1}>Content 2</Tabs.TabPanel>
</Tabs>

// ❌ Bad - Rigid structure
<Tabs tabs={['Tab 1', 'Tab 2']} panels={[<div>Content 1</div>, <div>Content 2</div>]} />
```

### 5. Provide Sensible Defaults
```jsx
// ✅ Good - Works with minimal props
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanel>Content 1</Tabs.TabPanel>
  <Tabs.TabPanel>Content 2</Tabs.TabPanel>
</Tabs>

// ❌ Bad - Requires too much configuration
<Tabs>
  <Tabs.TabList orientation="horizontal" variant="default">
    <Tabs.Tab index={0} active={false} disabled={false}>Tab 1</Tabs.Tab>
  </Tabs.TabList>
</Tabs>
```

## Common Patterns

### 1. Radio Group
```jsx
function RadioGroup({ children, value, onChange }) {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      <div role="radiogroup">{children}</div>
    </RadioContext.Provider>
  );
}

function RadioOption({ value, children }) {
  const { value: selectedValue, onChange } = useRadioContext();
  const isSelected = value === selectedValue;
  
  return (
    <label>
      <input
        type="radio"
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      {children}
    </label>
  );
}

RadioGroup.Option = RadioOption;
```

### 2. Dropdown Menu
```jsx
function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children }) {
  const { setIsOpen } = useDropdownContext();
  return (
    <button onClick={() => setIsOpen(prev => !prev)}>
      {children}
    </button>
  );
}

function DropdownMenu({ children }) {
  const { isOpen } = useDropdownContext();
  if (!isOpen) return null;
  return <div className="dropdown-menu">{children}</div>;
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
```

### 3. Stepper Component
```jsx
function Stepper({ children, currentStep, onStepChange }) {
  return (
    <StepperContext.Provider value={{ currentStep, onStepChange }}>
      <div className="stepper">{children}</div>
    </StepperContext.Provider>
  );
}

function Step({ index, children }) {
  const { currentStep, onStepChange } = useStepperContext();
  const isActive = currentStep === index;
  const isCompleted = currentStep > index;
  
  return (
    <div 
      className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={() => onStepChange(index)}
    >
      {children}
    </div>
  );
}

Stepper.Step = Step;
```

## Testing Strategy

### Testing Parent Component
```jsx
describe('Tabs', () => {
  it('provides context to children', () => {
    render(
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel index={0}>Content</Tabs.TabPanel>
      </Tabs>
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
```

### Testing Child Components
```jsx
describe('Tab', () => {
  it('throws error when used outside Tabs', () => {
    // Suppress console.error for this test
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<Tab index={0}>Tab</Tab>);
    }).toThrow('Tabs compound components must be used within a Tabs component');
    
    console.error.mockRestore();
  });
});
```

### Testing Interactions
```jsx
describe('Tabs interaction', () => {
  it('changes active tab on click', () => {
    render(
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel index={0}>Content 1</Tabs.TabPanel>
        <Tabs.TabPanel index={1}>Content 2</Tabs.TabPanel>
      </Tabs>
    );
    
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Tab 2'));
    
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeVisible();
  });
});
```

## When to Use This Pattern

✅ **Good for:**
- UI component libraries (tabs, accordions, menus)
- Components with complex internal state
- When you want to give users control over structure
- Components that need flexible composition
- Building design systems

❌ **Consider alternatives for:**
- Simple components with few variations
- Components that don't share state
- When a simple props API is sufficient
- Performance-critical components (context can cause re-renders)

## Common Pitfalls

1. **Over-engineering**: Not every component needs to be compound
2. **Context Performance**: Be mindful of unnecessary re-renders
3. **Poor Documentation**: Users need to understand the component relationships
4. **Missing Error Handling**: Always validate context usage
5. **Tight Coupling**: Don't make components too dependent on specific structure

## Comparison with Other Patterns

### vs. Render Props
```jsx
// Compound Components - More declarative
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab>Tab 1</Tabs.Tab>
  </Tabs.TabList>
</Tabs>

// Render Props - More explicit
<Tabs>
  {({ activeTab, setActiveTab }) => (
    <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
  )}
</Tabs>
```

### vs. Props Configuration
```jsx
// Compound Components - Flexible structure
<Tabs>
  <CustomWrapper>
    <Tabs.TabList>
      <Tabs.Tab>Tab 1</Tabs.Tab>
    </Tabs.TabList>
  </CustomWrapper>
</Tabs>

// Props Configuration - Fixed structure
<Tabs tabs={[{ label: 'Tab 1', content: <div>Content</div> }]} />
```

## Integration with Other Patterns

- **Custom Hooks**: Extract context logic into reusable hooks
- **Render Props**: Can be combined for even more flexibility
- **HOC**: Wrap compound components to add functionality
- **Provider Pattern**: Compound components often use Context/Provider

## Popular Libraries Using This Pattern

- **Reach UI**: Accessible component library
- **Radix UI**: Unstyled, accessible components
- **Headless UI**: Unstyled, accessible UI components
- **React Aria**: Adobe's accessible component library

## Summary

Compound components provide a powerful pattern for building flexible, reusable UI components. By sharing state through Context and giving users control over composition, you create intuitive APIs that are both powerful and easy to use. This pattern is especially valuable for component libraries and design systems where flexibility and consistency are paramount.
