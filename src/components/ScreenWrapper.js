import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({ children }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
