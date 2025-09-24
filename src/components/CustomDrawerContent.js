import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomDrawerContent(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Top Profile Section */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.fullName ? user.fullName[0] : "U"}
          </Text>
        </View>
        <View>
          <Text style={styles.userName}>
            {user?.fullName || user?.username || "Guest User"}
          </Text>
          <Text style={styles.userPhone}>
            {user?.phone || user?.terminalId || ""}
          </Text>
        </View>
      </View>

      {/* Drawer Menu */}
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          focused={props.state.index === 0}
          icon={({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={props.state.index === 0 ? "#1E90FF" : color}
            />
          )}
          labelStyle={[
            styles.menuLabel,
            props.state.index === 0 && styles.activeLabel,
          ]}
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="My Account"
          focused={props.state.index === 1}
          icon={({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={props.state.index === 1 ? "#1E90FF" : color}
            />
          )}
          labelStyle={[
            styles.menuLabel,
            props.state.index === 1 && styles.activeLabel,
          ]}
          onPress={() => props.navigation.navigate("MyAccount")}
        />
        <DrawerItem
          label="Support"
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          )}
          labelStyle={styles.menuLabel}
          onPress={() => console.log("Support pressed")}
        />
        <DrawerItem
          label="Notifications"
          icon={({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          )}
          labelStyle={styles.menuLabel}
          onPress={() => console.log("Notifications pressed")}
        />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E90FF",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    color: "#1E90FF",
    fontWeight: "bold",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userPhone: {
    color: "#f0f0f0",
    fontSize: 14,
  },
  menuLabel: {
    fontSize: 15,
    color: "#333",
  },
  activeLabel: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ff4d4d",
    margin: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
