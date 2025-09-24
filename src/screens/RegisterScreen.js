import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import AuthLayout from "../layouts/AuthLayout";
import ControlledInput from "../components/ControlledInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utlis/formSchema";
import { AuthContext } from "../context/AuthContext";
import Toast from "react-native-root-toast";

const fields = [
  { name: "fullName", placeholder: "Full Name", type: "text" },
  { name: "email", placeholder: "Email Address", type: "text" },
  { name: "phone", placeholder: "Phone Number", type: "text" },
  { name: "passportNumber", placeholder: "Passport Number", type: "text" },
  { name: "dob", placeholder: "Date of Birth (YYYY-MM-DD)", type: "text" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { register } = useContext(AuthContext);
  const onSubmit = async (data) => {
    await register(data);
    if (!result.success) {
      Alert.alert("Error", result.message || "Failed to register");
    }
  };
  return (
    <AuthLayout>
      <Image
        source={require("../../assets/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Create an Account to continue</Text>

      {fields.map((f) => (
        <ControlledInput
          key={f.name}
          control={control}
          name={f.name}
          placeholder={f.placeholder}
          type={f.type}
        />
      ))}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#c62828" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#1d2be0" }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 14 },
  logo: {
    width: 180,
    height: 50,
    alignSelf: "center",
    marginBottom: 5,
  },
  btn: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
