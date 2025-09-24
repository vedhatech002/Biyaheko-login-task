import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AuthLayout from "../layouts/AuthLayout";
import ControlledInput from "../components/ControlledInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utlis/formSchema";
import { AuthContext } from "../context/AuthContext";

const baseFields = [
  { name: "fullName", placeholder: "Full Name", type: "text" },
  { name: "email", placeholder: "Email Address", type: "text" },
  { name: "phone", placeholder: "Phone Number", type: "text" },
  { name: "passportNumber", placeholder: "Passport Number", type: "text" },
  { name: "dob", placeholder: "Date of Birth (YYYY-MM-DD)", type: "date" },
  {
    name: "country",
    placeholder: "Select Country",
    type: "select",
    options: [
      { label: "India", value: "IN" },
      { label: "USA", value: "US" },
      { label: "UK", value: "UK" },
    ],
  },
  {
    name: "state",
    placeholder: "Select State",
    type: "select",
    options: [],
  },
  { name: "username", placeholder: "Username", type: "text" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];

const statesByCountry = {
  IN: [
    { label: "Tamil Nadu", value: "TN" },
    { label: "Kerala", value: "KL" },
    { label: "Maharashtra", value: "MH" },
  ],
  US: [
    { label: "California", value: "CA" },
    { label: "Texas", value: "TX" },
    { label: "New York", value: "NY" },
  ],
  UK: [{ label: "London", value: "LDN" }],
};

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      passportNumber: "",
      dob: "",
      country: "",
      state: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedCountry = watch("country");

  const onSubmit = async (data) => {
    clearErrors();

    const result = await register(data);

    if (!result.success) {
      if (result.field) {
        setError(result.field, { type: "manual", message: result.message });
      } else {
        setError("fullName", { type: "manual", message: result.message });
      }

      return;
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

      {baseFields.map((f) => {
        const options =
          f.name === "state"
            ? statesByCountry[selectedCountry] || []
            : f.options;
        return (
          <ControlledInput
            key={f.name}
            control={control}
            name={f.name}
            placeholder={f.placeholder}
            type={f.type}
            options={options}
          />
        );
      })}

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
  logo: { width: 180, height: 50, alignSelf: "center", marginBottom: 5 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 14 },
  btn: { paddingVertical: 12, paddingHorizontal: 42, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "700" },
});
