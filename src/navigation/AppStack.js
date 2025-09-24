import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/HomeScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import AppHeader from "../components/AppHeader";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function ScreenWithHeader({ children, navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top", "bottom"]}
    >
      <StatusBar style="light" translucent={false} backgroundColor="#000" />
      <AppHeader navigation={navigation} />
      {children}
    </SafeAreaView>
  );
}

function HomeStack({ navigation }) {
  return (
    <ScreenWithHeader navigation={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </ScreenWithHeader>
  );
}

function AccountStack({ navigation }) {
  return (
    <ScreenWithHeader navigation={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      </Stack.Navigator>
    </ScreenWithHeader>
  );
}

export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen name="MyAccount" component={AccountStack} />
    </Drawer.Navigator>
  );
}
