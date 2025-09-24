import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const background = require("../../assets/bg.jpg");

export default function MyAccountScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>No user logged in</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <Ionicons name="person-circle" size={80} color="#007bff" />
          <Text style={styles.name}>{user.fullName || user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          <DetailRow
            icon="card-outline"
            label="Passport No"
            value={user.passportNumber}
          />
          <DetailRow
            icon="calendar-outline"
            label="Date of Birth"
            value={user.dob}
          />
          <DetailRow icon="flag-outline" label="Country" value={user.country} />
          <DetailRow icon="location-outline" label="State" value={user.state} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={20} color="#007bff" style={styles.icon} />
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
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
  headerTitle: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  container: { padding: 20, paddingBottom: 100 },
  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  email: { fontSize: 16, color: "gray", marginTop: 4 },
  phone: { fontSize: 16, color: "gray" },
  detailsCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
  label: { fontWeight: "bold", fontSize: 16, width: 120 },
  value: { fontSize: 16, flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { fontSize: 18, color: "gray" },
});
