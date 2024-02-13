import { createContext, useContext, useState } from "react";

const ItemsConetext = createContext();

export function ItemsProvider({ children }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);

    return (
        <ItemsConetext.Provider value={{
            searchQuery,
            setSearchQuery,
            appliedFilters,
            setAppliedFilters
        }}>
            {children}
        </ItemsConetext.Provider>
    );
}

export function useItems() {
    const context = useContext(ItemsConetext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
}