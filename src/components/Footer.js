import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function Footer() {
  const logos = [
    require("../../assets/logo_3.png"),
    require("../../assets/logo_4.png"),
    require("../../assets/logo_5.png"),
    require("../../assets/logo_8.png"),
    require("../../assets/logo_9.png"),
    require("../../assets/logo_10.png"),
  ];

  return (
    <BlurView intensity={90} tint="dark" style={styles.footer}>
      {/* Logo carousel */}
      <Carousel
        loop
        autoPlay
        autoPlayInterval={2000}
        width={width}
        height={70}
        data={logos}
        scrollAnimationDuration={1200}
        renderItem={({ item }) => (
          <View style={styles.logoWrapper}>
            <Image source={item} style={styles.logo} resizeMode="contain" />
          </View>
        )}
      />

      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => Linking.openURL("https://github.com/vedhatech002")}
      >
        <Text style={styles.madeBy}>
          Made with ❤️ by <Text style={styles.link}>@vedhatech</Text>
        </Text>
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    alignSelf: "center",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    marginTop: 20,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 50,
    tintColor: "#fff",
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 10,
  },
  copy: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  madeBy: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  link: {
    color: "#4da6ff",
    fontWeight: "bold",
  },
});
