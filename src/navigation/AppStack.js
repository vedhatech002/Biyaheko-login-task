import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import MyAccountScreen from "../screens/MyAccountScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack for Home (you can add more later inside)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Main Drawer
export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerPosition: "right",
        overlayColor: "transparent",
        drawerStyle: {
          backgroundColor: "#1E90FF",
          width: 260,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
