
# Compound Components in React

## About

Compound components are a pattern in React where a component manages the state and behavior of a set of related components. This pattern allows you to create expressive and declarative components that share implicit state, while providing a clear and easy-to-use API for the consumer.

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
