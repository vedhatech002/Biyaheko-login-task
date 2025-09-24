import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ScreenWrapper from "../components/ScreenWrapper";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <ScreenWrapper>
            <LoginScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(props) => (
          <ScreenWrapper>
            <RegisterScreen {...props} />
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
