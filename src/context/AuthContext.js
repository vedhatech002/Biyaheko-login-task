// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem("user");
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async ({ terminalId, username, password }) => {
    setLoading(true);
    try {
      if (!username || !password) {
        return { success: false, message: "Username and password required" };
      }
      // fake auth delay
      await new Promise((r) => setTimeout(r, 600));
      const fakeUser = {
        terminalId,
        username,
        token: "fake-token-123",
        loggedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return { success: true };
    } catch (e) {
      console.warn("login error", e);
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      // simulate network delay so toast is visible before navigation switch
      await new Promise((r) => setTimeout(r, 800));

      const fakeUser = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        token: "fake-register-token-123",
        registeredAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
      // show toast BEFORE setUser so the user sees it on the registration screen
      Toast.show("🎉 Registration successful!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });

      setUser(fakeUser);
      return { success: true };
    } catch (e) {
      console.warn("register error", e);
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
