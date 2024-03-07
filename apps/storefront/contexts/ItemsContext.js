import { createContext, useContext, useState } from "react";

const ItemsContext = createContext();

export function ItemsProvider({ children }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);

    return (
        <ItemsContext.Provider value={{
            searchQuery,
            setSearchQuery,
            appliedFilters,
            setAppliedFilters
        }}>
            {children}
        </ItemsContext.Provider>
    );
}

export function useItems() {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
}