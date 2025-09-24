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
      // very simple validation
      if (!username || !password) {
        return { success: false, message: "Username and password required" };
      }

      // TODO: replace with real API call and token handling
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

  const register = async (formData) => {
    try {
      // fake API call
      const fakeUser = {
        username: formData.fullName,
        email: formData.email,
        token: "fake-register-token",
        registeredAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);

      // ✅ Toast shown here
      Toast.show("🎉 Registration Successful!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });

      return { success: true };
    } catch (e) {
      console.warn("register error", e);
      return { success: false, message: "Something went wrong" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
