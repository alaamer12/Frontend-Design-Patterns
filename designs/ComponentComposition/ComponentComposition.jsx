import React, { useEffect, useState } from 'react';

let fakeData = [
    {
        id: 1,
        name: "John",
    },
    {
        id: 2,
        name: "Jane",
    },
    {
        id: 3,
        name: "Joe",
    },
];

function DataList({ data }) {
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

function DataContainerComponent() {
    const [data, setData] = useState(fakeData);

    useEffect(() => {
        // Placeholder for any side effects or data fetching
        return () => {
            // Cleanup if needed
        };
    }, []); // Empty dependency array to run once on mount

    return (
        <div>
            <DataList data={data} />
        </div>
    );
}

function DataPresentationComponent() {
    return (
        <div>
            <header className="App-header">
                <h1>Component Composition</h1>
                <DataContainerComponent />
            </header>
            <footer className="App-footer">
                <h1>Component Composition</h1>
            </footer>
        </div>
    );
}

function ComponentComposition() {
    return (
        <div>
            <main className="App-main">Component Composition</main>
            <DataPresentationComponent />
        </div>
    );
}

export default ComponentComposition;
