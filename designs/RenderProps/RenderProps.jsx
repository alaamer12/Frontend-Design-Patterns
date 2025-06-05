import React, { useState } from 'react';
const DataProvider = ({ render }) => {
    const [data, setData] = useState('Initial Data');

    const fetchData = () => {
    // Simulate data fetching
    setTimeout(() => {
            setData('Fetched Data');
        },
        1000);
    };

    return render({ data, fetchData });
};

function RenderProps(props) {
    return (
        <DataProvider
        render={({ data, fetchData }) => (
            <div>
                <p>{data}</p>
                <button onClick={fetchData}>Fetch Data</button>
            </div>
        )}
        />
    );
}

export default RenderProps;