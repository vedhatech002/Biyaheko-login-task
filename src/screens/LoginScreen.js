// src/screens/LoginScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utlis/formSchema";
import ControlledInput from "../components/ControlledInput";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);

  const { control, handleSubmit, setError, clearErrors } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { terminalId: "", username: "", password: "" },
  });

  const onSubmit = async (data) => {
    clearErrors();

    const result = await login(data);
    console.log("Login result:", result); // 🔍 Debugging

    if (!result.success) {
      const msg = result.message || "Login failed";

      console.log("msg");

      if (msg.toLowerCase().includes("user does not exist")) {
        setError("username", { type: "manual", message: msg });
      } else if (msg.toLowerCase().includes("password")) {
        setError("password", { type: "manual", message: msg });
      } else {
        setError("username", { type: "manual", message: msg });
      }

      return; // 🚨 prevent continuing on error
    }

    // ✅ If success, context sets user and RootNavigator will switch to AppStack
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

      {formConfig.map((f) => (
        <ControlledInput
          key={f.name}
          control={control}
          name={f.name}
          placeholder={f.placeholder}
          type={f.type}
        />
      ))}

      <TouchableOpacity onPress={() => {}}>
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
  logo: { width: 180, height: 50, alignSelf: "center", marginBottom: 5 },
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
