import { useState, createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}
