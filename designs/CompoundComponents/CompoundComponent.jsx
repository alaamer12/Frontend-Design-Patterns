import React from 'react';

const TabsContext = React.createContext();

// Compound Component Example
function Tabs(props) {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <TabsContext.Provider value={{activeTab, setActiveTab}}>
            {props.children}
        </TabsContext.Provider>
    );
}

function TabList({children}) {
    return (
        <div>{children}</div>
    );
}

function Tab({index, children}) {
    const {activeTab, setActiveTab} = React.useContext(TabsContext);
    return (
        <button
            onClick={() => setActiveTab(index)}
        >
            {children}
            {activeTab === index ? '✓' : ''}
        </button>
    );
}

function TabPanel({index, children}) {
    const {activeTab} = React.useContext(TabsContext);
    return activeTab === index ? {children} : null;
}


Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;