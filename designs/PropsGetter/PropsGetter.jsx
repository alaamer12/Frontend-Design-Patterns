function formatData(data) {
    return {
        formattedData: data.toUpperCase(),
    };
}

function PropsGetter({ data }) {
    const props = formatData(data);
    return <ChildComponent {...props} />;
}

function ChildComponent({ formattedData }) {
    return <div>{formattedData}</div>; 
}

export default PropsGetter;