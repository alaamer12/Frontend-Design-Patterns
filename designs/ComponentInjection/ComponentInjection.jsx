import React from 'react';

// Base Component Injection Example
function BaseComponent({Header, Content,Footer}) {
    return (
        <div>
            {Header && <Header />}
            <main>
                {Content? <Content />: <h1>Component Injection</h1>}
            </main>
            {Footer && <Footer />}
        </div>
    );
}

function BaseApp(props) {
    return (
        <BaseComponent
        Header={() => <h1>Header Injection</h1>}
        Content={() => <h1>Content Injection</h1>}
        Footer={() => <h1>Footer Injection</h1>}
        />
    );
}

// More Advanced Component Injection Example
function PluginHost({plugins}) {
    return (
        <div>
            {plugins.map((Plugin, index) => (
                <Plugin key={index} />
            ))}
        </div>
    );
}

function App(props) {
    return (
        <PluginHost
        plugins={[
            () => <h1>Plugin 1</h1>,
            () => <h1>Plugin 2</h1>,
            () => <h1>Plugin 3</h1>,
        ]}
        />
    );
}

function ComponentInjection(props) {
    return (
        <div>
            <BaseApp />
            <App />
        </div>
    );
}

export default ComponentInjection;