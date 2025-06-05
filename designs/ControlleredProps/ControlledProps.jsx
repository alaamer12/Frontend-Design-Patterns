import React from 'react';

// Controlled Form Input Example
function ControlledInput({ value, onChange }) {
    return <input value={value} onChange={onChange} />;
}
function ParentComponent() {
    const [inputValue, setInputValue] = React.useState('');
return (
    <ControlledInput value={inputValue} onChange={(e) =>
        setInputValue(e.target.value)}
/> );
}



function ControlledProps(props) {
    return (
        <div>
            <ParentComponent />
        </div>
    );
}

export default ControlledProps;