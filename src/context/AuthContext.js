"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  loading: true,
  login: async () => {},
  signUp: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to format a rich artisan user object
  const formatUser = (fbUser, customProfile = null) => {
    if (!fbUser) return null;

    let savedProfile = customProfile;
    if (!savedProfile && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(`handmade_artisan_${fbUser.uid}`);
        if (raw) savedProfile = JSON.parse(raw);
      } catch {
        // localStorage fallback
      }
    }

    const name =
      fbUser.displayName ||
      savedProfile?.name ||
      fbUser.email?.split("@")[0] ||
      "Artisan Maker";

    const cleanHandle = name.toLowerCase().replace(/[^a-z0-9]/g, "");

    const avatar =
      fbUser.photoURL ||
      savedProfile?.avatar ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}&backgroundColor=b45309,d97706,78350f`;

    return {
      uid: fbUser.uid,
      name,
      email: fbUser.email,
      role: savedProfile?.role || "Guild Maker",
      avatar,
      storeName:
        savedProfile?.storeName || `${name}'s Handcrafted Atelier`,
      storeHandle: savedProfile?.storeHandle || `@${cleanHandle || "artisan"}`,
      craftType: savedProfile?.craftType || "Handmade Crafts",
      stats: savedProfile?.stats || {
        products: 1,
        rating: "5.0",
        sales: 0,
      },
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        setUser(formatUser(currentUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with Email and Password + Artisan metadata
  const signUp = async (email, password, { name, storeName, craftType } = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(cred.user, {
        displayName: name,
      });
    }

    const profileData = {
      name: name || cred.user.email?.split("@")[0],
      storeName: storeName || `${name || "My"} Handcrafted Atelier`,
      craftType: craftType || "Ceramics & Stoneware",
      role: "Guild Maker",
      storeHandle: "@" + (name ? name.toLowerCase().replace(/[^a-z0-9]/g, "") : "maker"),
      stats: { products: 1, rating: "5.0", sales: 0 },
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          `handmade_artisan_${cred.user.uid}`,
          JSON.stringify(profileData)
        );
      } catch {
        // localStorage fallback
      }
    }

    const formatted = formatUser(cred.user, profileData);
    setUser(formatted);
    return formatted;
  };

  // Sign in with Email and Password
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const formatted = formatUser(cred.user);
    setUser(formatted);
    return formatted;
  };

  // Sign in with Google Popup
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(auth, provider);
    const formatted = formatUser(cred.user);
    setUser(formatted);
    return formatted;
  };

  // Sign out
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        firebaseUser,
        loading,
        login,
        signUp,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
