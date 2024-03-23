import { createContext, useContext, useState } from "react";

const ActiveStoreContext = createContext();

export function ActiveStoreProvider({ children }) {
    
    const setActiveStore = (store) => {
        localStorage.setItem('activeStore', JSON.stringify(store));
        setStore(store);
    };

    const getStore = () => {
        if (typeof window !== 'undefined') {
            const store = localStorage.getItem('activeStore');
            return store ? JSON.parse(store) : null;
        }
    };

    const [activeStore, setStore] = useState(getStore());

    return (
        <ActiveStoreContext.Provider value={{ activeStore, setActiveStore }}>
            {children}
        </ActiveStoreContext.Provider>
    );
}

export function useActiveStore() {
    const context = useContext(ActiveStoreContext);
    if (!context) {
        throw new Error('useActiveStore must be used within a ActiveStoreProvider');
    }
    return context;
}

export function signOutCallback() {
    localStorage.removeItem('activeStore');
}