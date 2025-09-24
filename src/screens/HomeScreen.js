import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username || "agent"}!</Text>
      <Text style={styles.subtitle}>Terminal: {user?.terminalId || "—"}</Text>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#666", marginBottom: 18 },
  logout: {
    backgroundColor: "#b00020",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
});
