import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import useAxios from "../hooks/useAxios"
import auth from '../config/firebase.config'



export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosBase = useAxios()


    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }


    // const updateDetails = (name, url) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: url
    //     })
    // }

    // const updateDetails = (name, url) => {
    //     const updateData = {};

    //     if (name) updateData.displayName = name;
    //     if (url) updateData.photoURL = url;

    //     if (Object.keys(updateData).length === 0) {
    //         return Promise.resolve();
    //     }

    //     return updateProfile(auth.currentUser, updateData);
    // };


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    }, [axiosBase])


    const authInfo = {
        user,
        loading,
        setLoading,
        loginWithGoogle,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider