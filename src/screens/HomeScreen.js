import React from "react";
import { Text, StyleSheet, FlatList, ImageBackground } from "react-native";
import FlightCard from "../components/FlightCard";
const background = require("../../assets/bg.jpg");

const flights = [
  {
    id: "1",
    airline: "Sunlight Air",
    flightNo: "SL123",
    from: "Chennai (MAA)",
    to: "Delhi (DEL)",
    date: "2025-09-28",
    time: "08:30 AM",
    price: "₹5,200",
  },
  {
    id: "2",
    airline: "SkyJet",
    flightNo: "SJ456",
    from: "Bangalore (BLR)",
    to: "Mumbai (BOM)",
    date: "2025-09-29",
    time: "06:45 PM",
    price: "₹4,800",
  },
  {
    id: "3",
    airline: "IndiFly",
    flightNo: "IF789",
    from: "Kolkata (CCU)",
    to: "Hyderabad (HYD)",
    date: "2025-09-30",
    time: "09:10 AM",
    price: "₹4,500",
  },
  {
    id: "4",
    airline: "AirConnect",
    flightNo: "AC101",
    from: "Delhi (DEL)",
    to: "Goa (GOI)",
    date: "2025-10-01",
    time: "11:20 AM",
    price: "₹6,000",
  },
  {
    id: "5",
    airline: "FlyFast",
    flightNo: "FF202",
    from: "Mumbai (BOM)",
    to: "Dubai (DXB)",
    date: "2025-10-02",
    time: "02:30 PM",
    price: "₹15,800",
  },
  {
    id: "6",
    airline: "GlobalAir",
    flightNo: "GA303",
    from: "Delhi (DEL)",
    to: "Singapore (SIN)",
    date: "2025-10-03",
    time: "01:00 AM",
    price: "₹22,400",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <Text style={styles.sectionTitle}>Available Flights</Text>

      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FlightCard flight={item} />}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logo: { width: 150, height: 50, alignSelf: "center", marginBottom: 5 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
});
