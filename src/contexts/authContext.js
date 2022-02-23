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

  const signUpWithGoogle = async () => {
    await auth.signInWithRedirect(provider).catch((err) => {
      console.log(err);
    });
  };

  const logout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setStatus(true);
        await axios.post(
          "https://momento-heroku.herokuapp.com/authenticate",
          user
        );
      } else {
        setStatus(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isloggedin,
    signUpWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
