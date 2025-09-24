// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Default user (includes all fields)
  const defaultUser = {
    terminalId: "T12345",
    username: "demo",
    password: "demo123",
    fullName: "Demo User",
    email: "demo@example.com",
    phone: "9876543210",
    passportNumber: "P1234567",
    dob: "1990-01-01",
    country: "India",
    state: "Maharashtra",
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Ensure `users` DB exists with default user
        const storedUsers = await AsyncStorage.getItem("users");
        if (!storedUsers) {
          await AsyncStorage.setItem("users", JSON.stringify([defaultUser]));
        }

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

  // 🔹 Login
  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      if (!username || !password) {
        return { success: false, message: "Username and password required" };
      }

      const storedUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];
      const foundUser = storedUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: "Invalid credentials" };
      }

      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    } catch (e) {
      console.warn("login error", e);
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register
  const register = async (formData) => {
    setLoading(true);
    try {
      const storedUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];

      if (storedUsers.some((u) => u.username === formData.username)) {
        return { success: false, message: "Username already taken" };
      }

      const newUser = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        passportNumber: formData.passportNumber,
        dob: formData.dob,
        country: formData.country,
        state: formData.state,
        token: "local-token-" + Date.now(),
        registeredAt: new Date().toISOString(),
      };

      const updatedUsers = [...storedUsers, newUser];
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      Toast.show("🎉 Registration successful!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });

      setUser(newUser);
      return { success: true };
    } catch (e) {
      console.warn("register error", e);
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
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
