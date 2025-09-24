import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

export default function ControlledInput({
  control,
  name,
  placeholder,
  type = "text",
  rules,
}) {
  const [secure, setSecure] = useState(type === "password");

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 16 }}>
          {/* Input Row */}
          <View style={[styles.inputWrapper, error && { borderColor: "red" }]}>
            {/* Left Icon */}
            {type === "password" && (
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={error ? "red" : "#666"}
                style={styles.leftIcon}
              />
            )}
            {type === "text" && (
              <Ionicons
                name="person-outline"
                size={20}
                color={error ? "red" : "#666"}
                style={styles.leftIcon}
              />
            )}

            {/* Input */}
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor={error ? "red" : "#666"}
              secureTextEntry={secure}
              autoCapitalize="none"
              style={styles.input}
            />

            {/* Right Eye Icon for password */}
            {type === "password" && (
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Ionicons
                  name={secure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={error ? "red" : "#000"} // red if error
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Error Message BELOW input */}
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 1,
    marginLeft: 4,
  },
});
