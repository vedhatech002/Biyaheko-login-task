import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Footer from "../components/Footer";

const background = require("../../assets/bg.jpg");

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <ImageBackground source={background} style={styles.bg} resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroText}>
              Connecting <Text style={styles.highlight}>Agencies</Text>.
            </Text>
            <Text style={styles.heroText}>Simplifying Travels.</Text>
            <Text style={styles.heroSubtitleText}>
              One Platform. Limitless Scale.
            </Text>
          </View>
          {/* children card componet will be pass here */}
          <View style={styles.card}>{children}</View>
          <Footer />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },
  container: { flexGrow: 1, marginTop: 5, padding: 15 },
  heroTextContainer: { marginBottom: 15 },
  heroText: { fontSize: 32, fontWeight: "bold", color: "white" },
  highlight: { color: "gold" },
  heroSubtitleText: { fontSize: 18, color: "white" },
  card: {
    marginTop: 15,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
});
