import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext({});

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const ADMIN_EMAIL = "turjo.web@gmail.com";

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;


// ✅ Update Profile
const updateUserProfile = async (name: string, photo: string) => {
  return await updateProfile(auth.currentUser!, {
    displayName: name,
    photoURL: photo,
  });
};


  // ✅ Signup
  const createNewUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(result.user, { displayName: name });
    }

    setUser({ ...result.user, displayName: name });
    setLoading(false);

    return result;
  };

  // ✅ Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Google
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    setLoading(false);
    return result;
  };

  // ✅ Facebook
  const facebookLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, facebookProvider);
    setLoading(false);
    return result;
  };

  // ✅ Twitter
  const twitterLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, twitterProvider);
    setLoading(false);
    return result;
  };

  // ✅ Login
  const userLogin = async (email: string, password: string) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    return result;
  };

  // ✅ Logout
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  // ✅ Reset
  const resetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    loading,
    isAdmin,
    createNewUser,
    userLogin,
    googleLogin,
    facebookLogin,
    twitterLogin,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;