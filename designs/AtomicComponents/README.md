# Atomic Design Pattern in React

## About

This guide explains the Atomic Design pattern, a methodology for creating design systems. It emphasizes building user interfaces from small, independent components, promoting reusability, consistency, and scalability. The pattern is structured in five distinct levels:

### 1. Atoms
Atoms are the basic building blocks of your application. They represent the smallest possible components, such as buttons, inputs, labels, or individual icons. These components are often stateless and are concerned only with their own presentation.

**Example: A simple Button atom**
```jsx
// src/components/atoms/Button.jsx
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
```

### 2. Molecules
Molecules are groups of atoms bonded together to form a more complex component. They serve a specific purpose and can have their own state. For example, a search form molecule could consist of an input atom, a button atom, and a label atom.

**Example: A SearchForm molecule**
```jsx
// src/components/molecules/SearchForm.jsx
import React, afrom 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const SearchForm = () => (
  <div>
    <Label text="Search" />
    <Input type="text" placeholder="Enter your search term" />
    <Button label="Submit" />
  </div>
);

export default SearchForm;
```

### 3. Organisms
Organisms are groups of molecules and/or atoms that form a more complex, distinct section of an interface. An organism could be a header, a footer, or a product grid. They are often composed of different types of molecules and are responsible for a significant piece of functionality.

**Example: A Header organism**
```jsx
// src/components/organisms/Header.jsx
import React from 'react';
import Logo from '../atoms/Logo';
import Navigation from '../molecules/Navigation';
import SearchForm from '../molecules/SearchForm';

const Header = () => (
  <header>
    <Logo />
    <Navigation />
    <SearchForm />
  </header>
);

export default Header;
```

### 4. Templates
Templates are page-level objects that place components into a layout. They define the structure of a page, but without the actual content. Templates are concerned with the layout and hierarchy of components, providing a context for the organisms and molecules.

**Example: A Page template**
```jsx
// src/components/templates/PageTemplate.jsx
import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const PageTemplate = ({ children }) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageTemplate;
```

### 5. Pages
Pages are specific instances of templates. They are the most concrete level of the hierarchy and are responsible for fetching and displaying the actual content. Pages are where templates are filled with real data and where the user interacts with the application.

**Example: A Home page**
```jsx
// src/components/pages/HomePage.jsx
import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import ProductGrid from '../organisms/ProductGrid';

const HomePage = () => (
  <PageTemplate>
    <h1>Welcome to our store!</h1>
    <ProductGrid />
  </PageTemplate>
);

export default HomePage;
```

## Note

- **Props for Reusability**: Each component, especially at the atom and molecule level, should be designed to be highly reusable. This is typically achieved by passing props to customize their appearance and behavior.
- **Clear Separation of Concerns**: Each level of the hierarchy has a clear responsibility. This separation makes the codebase easier to understand, maintain, and test.
- **Scalability**: The Atomic Design pattern provides a clear methodology for building a design system that can scale with your application.