import React from 'react';


function AtomComponent({label, onClick}) {
    return (
        <button onClick={onClick} >{label}</button>
    );
}

function MoleculeComponent({label, inputType, buttonText, onButtonClicked}) {
    return (
        <div>
            <label>{label}</label>
            <input type={inputType} />
            <AtomComponent label={buttonText} onClick={onButtonClicked} />
        </div>
    );
}


function OrganismComponent({label, buttonText, onButtonClicked}) {
    return (
        <div>
            <label>{label}</label>
            <MoleculeComponent label={buttonText} onButtonClicked={onButtonClicked} />
        </div>
    );
}

function TemplateComponent({label, buttonText, onButtonClicked, children}) {
    return (
        <div>
            <label>{label}</label>
            <OrganismComponent label={buttonText} onButtonClicked={onButtonClicked} />
            {children}
        </div>
    );
}

function AtomicComponents(props) {
    return (
        <div>
            <header className="App-header">
                <h1>Atomic Components</h1>
            </header>
            <TemplateComponent {...props} />
            <footer className="App-footer">
                <h1>Atomic Components</h1>
            </footer>
        </div>
    );
}

export default AtomicComponents;