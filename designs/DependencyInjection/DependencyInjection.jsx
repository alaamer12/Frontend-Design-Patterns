import React, { useState, useContext } from 'react';
import { Container } from 'inversify';
import { Provider as DIProvider } from 'react-di';

// Define the service
const useMyService = () => {
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    };

    const getCounter = () => {
        return counter;
    };

    return {
        counter,
        incrementCounter,
        getCounter
    };
};

// Create a React context
const MyContext = React.createContext(null);

// Create a provider component for the context
const MyProvider = ({ children }) => {
    const myService = useMyService(); // use the service hook
    return (
        <MyContext.Provider value={myService}>
            {children}
        </MyContext.Provider>
    );
};

// Set up Inversify container
const container = new Container();
container.bind('MyService').toDynamicValue(() =>
    useMyService()).inSingletonScope(); // bind MyService to the container

// Component using the context
const MyComponent = () => {
    const { counter, incrementCounter } = useContext(MyContext);

    const handleIncrement = () => {
        incrementCounter();
    };

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    );
};

function DependencyInjection(props) {
    return (
        <DIProvider container={container}>
            <MyProvider>
                <MyComponent />
            </MyProvider>
        </DIProvider>
    );
}

export default DependencyInjection;
