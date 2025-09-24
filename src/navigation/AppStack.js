import React from "react";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar"; // ✅ for controlling status bar
import HomeScreen from "../screens/HomeScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import MyAccountScreen from "../screens/MyAccountScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// ✅ Wrapper to control status bar when drawer opens
function DrawerWrapper(props) {
  const drawerStatus = useDrawerStatus();

  return (
    <>
      {/* Change status bar based on drawer state */}
      <StatusBar
        style={"light"}
        translucent={false}
        backgroundColor={drawerStatus === "open" ? "#000" : "transparent"}
      />
      <CustomDrawerContent {...props} />
    </>
  );
}

export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerWrapper {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: "right",
        overlayColor: "transparent",
        drawerStyle: {
          backgroundColor: "#1E90FF",
          width: 260,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
    </Drawer.Navigator>
  );
}
