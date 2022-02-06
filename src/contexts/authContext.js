import React, { useContext, createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import "firebase/compat/app";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isloggedin, setStatus] = useState(false);

  const signup = async ({ firstname, lastname, email, password }) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };

  const login = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const signUpWithGoogle = async () => {
    await auth.signInWithRedirect(provider);
  };

  const logout = async () => {
    return await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setStatus(true);
        await axios.post("/authenticate", user);
      } else {
        setStatus(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isloggedin,
    signup,
    login,
    signUpWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
