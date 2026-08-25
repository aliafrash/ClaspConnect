import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  isElderly = false,
  multiline = false,
  numberOfLines = 1,
  style
}) {
  const fontSize = isElderly ? 18 : 15;
  const lineHeight = isElderly ? 24 : 20;

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: isElderly ? 18 : 14,
              lineHeight: isElderly ? 24 : 18
            }
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            minHeight: multiline ? 100 : (isElderly ? 58 : 50),
            borderColor: error ? COLORS.danger : COLORS.border
          },
          style
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={isElderly ? 24 : 20}
            color={COLORS.primary}
            style={styles.icon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[
            styles.input,
            {
              fontSize,
              lineHeight: multiline ? (isElderly ? 26 : 22) : lineHeight,
              textAlignVertical: multiline ? "top" : "center"
            }
          ]}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%"
  },
  label: {
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
    includeFontPadding: false
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  icon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    color: COLORS.text,
    paddingVertical: 10,
    includeFontPadding: false
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    marginLeft: 4,
    includeFontPadding: false
  }
});

