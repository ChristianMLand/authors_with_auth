import { useContext, createContext } from "react";

const context = createContext(null);
export const useAppContext = () => useContext(context);
export const AppContext = ({ children, ...values }) => {
    return (
        <context.Provider value={ values }>
            { children }
        </context.Provider>
    );
};