// src/components/FlightCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function FlightCard({ flight }) {
  return (
    <BlurView intensity={70} tint="light" style={styles.card}>
      {/* 🔹 Top Row: Airline + FlightNo + Plane Icon */}
      <View style={styles.topRow}>
        <Text style={styles.airline}>{flight.airline}</Text>
        <Ionicons
          name="airplane"
          size={18}
          color="#1d2be0"
          style={{ marginHorizontal: 6 }}
        />
        <Text style={styles.flightNo}>{flight.flightNo}</Text>
      </View>

      {/* 🔹 Route */}
      <Text style={styles.route}>
        {flight.from} → {flight.to}
      </Text>

      {/* 🔹 Date & Time */}
      <Text style={styles.details}>
        <Ionicons name="calendar" size={14} color="#444" /> {flight.date} |{" "}
        <Ionicons name="time" size={14} color="#444" /> {flight.time}
      </Text>

      {/* 🔹 Price */}
      <Text style={styles.price}>
        <Ionicons name="pricetag" size={14} color="#c62828" /> {flight.price}
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.3)", // fallback
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  airline: { fontSize: 16, fontWeight: "600", color: "#1d2be0" },
  flightNo: { fontSize: 14, color: "#666" },
  route: { fontSize: 15, marginTop: 6, fontWeight: "500" },
  details: { fontSize: 13, color: "#444", marginTop: 6 },
  price: { fontSize: 16, fontWeight: "700", marginTop: 6, color: "#c62828" },
});
