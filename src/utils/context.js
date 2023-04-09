import { useContext, createContext } from "react";
// create our empty context
const context = createContext(null);
// a simple hook to get our data stored in context
export const useAppContext = () => useContext(context);
// a simple wrapper component that provides context to its children via props
export const AppContext = ({ children, ...values }) => {
    return (
        <context.Provider value={ values }>
            { children }
        </context.Provider>
    );
};