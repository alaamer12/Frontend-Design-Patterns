import React from 'react';


const MyContext = React.createContext(null);

function ProviderPattern(props) {
    const [value, setValue] = React.useState(0);
    return (
        <MyContext.Provider value={{value, setValue}}>
            {props.children}
        </MyContext.Provider>
    );
}

function ConsumerComponent() {
    const {value, setValue} = React.useContext(MyContext);
    return (
        <div>
            <p>Value: {value}</p>
            <button onClick={() => setValue(value + 1)}>Increment</button>
        </div>
    );
}

function ProviderConsumer() {
    return (
        <div>
            <ProviderPattern>
                {/*...*/}
                <ConsumerComponent />
                {/*...*/}
            </ProviderPattern>
        </div>
    );
}
export default ProviderPattern;