import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 60, // fixed height
  },
  logo: { width: 150, height: 50, alignSelf: "center" },
});
