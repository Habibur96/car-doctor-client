import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //SignIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //GoogleSignIn
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //SignOut
  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //Observer user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current usert in auth provider", currentUser);
      setLoading(false);
      if (currentUser && currentUser.email) {
        const loggedUser = {
          email: currentUser.email,
        };
        fetch("https://car-doctor-server-habibur96.vercel.app/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("Data-token : ", data);
            localStorage.setItem("car-access-token", data.token);
          });
      } else {
        localStorage.removeItem("car-access-token");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = { user, loading, createUser, signIn, SignOut, googleLogIn };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
