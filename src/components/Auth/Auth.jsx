import React, { useEffect, useState } from 'react';
import { app } from '../../api/firestore_db'
import { getAuth } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
        })
    }, []);
    if (pending) {
        return <>Loading ...</>
    }

    return (
        <AuthContext.Provider
            value={{ currentUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}