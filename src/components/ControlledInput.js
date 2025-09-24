import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

/**
 * ControlledInput
 * Props:
 * - control (react-hook-form control)
 * - name (field name)
 * - placeholder
 * - type: "text" | "password" | "date" | "select"
 * - rules (validation rules)
 * - options (for select): [{ label, value }]
 */

const iconMapper = {
  fullName: "person-outline",
  username: "person-outline",
  email: "mail-outline",
  phone: "call-outline",
  password: "lock-closed-outline",
  confirmPassword: "lock-closed-outline",
  passportNumber: "card-outline",
  dob: "calendar-outline",
  country: "flag-outline",
  state: "map-outline",
  default: "create-outline",
};

export default function ControlledInput({
  control,
  name,
  placeholder,
  type = "text",
  rules = {},
  options = [],
}) {
  const [secure, setSecure] = useState(type === "password");
  const [showPicker, setShowPicker] = useState(false);

  const getIconName = () => iconMapper[name] || iconMapper.default;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 14 }}>
          <View style={[styles.inputWrapper, error && { borderColor: "red" }]}>
            {/* left icon */}
            <Ionicons
              name={getIconName()}
              size={20}
              color={error ? "red" : "#666"}
              style={styles.leftIcon}
            />

            {/* text / password */}
            {(type === "text" || type === "password") && (
              <TextInput
                value={value ?? ""}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={error ? "red" : "#666"}
                secureTextEntry={secure}
                autoCapitalize="none"
                style={[styles.input, { color: "#000" }]}
              />
            )}

            {/* date - show placeholder or value, open DateTimePicker on press */}
            {type === "date" && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => setShowPicker(true)}
              >
                <Text style={{ color: value ? "#000" : "#666" }}>
                  {value || placeholder}
                </Text>
              </TouchableOpacity>
            )}

            {/* native DateTimePicker - displayed when showPicker true */}
            {showPicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                value={value ? new Date(value) : new Date()}
                onChange={(event, selectedDate) => {
                  // Android will call onChange twice (dismiss + selected). Handle accordingly.
                  setShowPicker(false);
                  if (selectedDate) {
                    // store as YYYY-MM-DD string to match schema
                    const isoDate = selectedDate.toISOString().split("T")[0];
                    onChange(isoDate);
                  }
                }}
              />
            )}

            {/* select / picker */}
            {type === "select" && (
              <Picker
                selectedValue={value ?? ""}
                onValueChange={(v) => onChange(v)}
                style={styles.picker}
                dropdownIconColor={error ? "red" : "#666"} // arrow color
              >
                <Picker.Item label={placeholder} value="" color="#666" />
                {(options || []).map((opt) => (
                  <Picker.Item
                    key={String(opt.value)}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            )}

            {/* right icon for password toggle */}
            {type === "password" && (
              <TouchableOpacity onPress={() => setSecure((s) => !s)}>
                <Ionicons
                  name={secure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={error ? "red" : "#000"}
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* error message below input */}
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
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#000",
  },
  picker: {
    flex: 1,
    fontSize: 16,
    color: "#000",
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
    marginTop: 6,
    marginLeft: 4,
  },
});
