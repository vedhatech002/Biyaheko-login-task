import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utlis/formSchema";
import ControlledInput from "../components/ControlledInput";
import AuthLayout from "../layouts/AuthLayout";

// Put a background image at ./assets/background.jpg or remove ImageBackground wrapper.
const background = require("../../assets/bg.jpg");

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { terminalId: "", username: "", password: "" },
  });

  const onSubmit = (data) => {
    login(data);
  };

  const formConfig = [
    {
      name: "terminalId",
      placeholder: "Terminal ID / Alias (optional)",
      type: "text",
    },
    { name: "username", placeholder: "Username", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  return (
    <AuthLayout>
      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Log in to your account to continue</Text>

      {formConfig.map((field) => (
        <ControlledInput
          key={field.name}
          control={control}
          name={field.name}
          placeholder={field.placeholder}
          type={field.type}
        />
      ))}

      <TouchableOpacity
        onPress={() => {
          /* TODO: forgot password flow */
        }}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 50,
    alignSelf: "center",
    marginBottom: 5,
  },

  title: { fontSize: 22, fontWeight: "600", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 14 },
  forgot: { color: "#d33", textAlign: "right", marginVertical: 2 },
  loginBtn: {
    backgroundColor: "#1d2be0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  loginText: { color: "#fff", fontWeight: "700" },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  registerLink: { color: "#1d2be0", fontWeight: "600" },
});
