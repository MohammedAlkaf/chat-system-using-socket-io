import { useState, createContext, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/get-login-session')
        .then(res => res.json())
        .then( data => {
            if( data.status === 200){
                setCurrentUser(data.result);
                setIsLoggedIn(true);
                console.log(data.message)
            }
            else {
                console.log(data.message);
            }
        })
        return () => {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }
    }, [])

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
