import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  icon = null,
  loading = false,
  isElderly = false,
  style,
  textStyle,
  disabled = false
}) {
  const getBackgroundColor = () => {
    if (disabled) return "#D1D5DB";
    switch (variant) {
      case "secondary":
        return COLORS.secondary;
      case "success":
        return COLORS.success;
      case "danger":
        return COLORS.danger;
      case "warning":
        return COLORS.warning;
      case "outline":
        return "transparent";
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return "#6B7280";
    if (variant === "outline") return COLORS.primary;
    return COLORS.white;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          minHeight: isElderly ? 58 : 50,
          borderWidth: variant === "outline" ? 2 : 0,
          borderColor: variant === "outline" ? COLORS.primary : "transparent"
        },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && (
            <Ionicons
              name={icon}
              size={isElderly ? 24 : 20}
              color={getTextColor()}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: isElderly ? 20 : 16,
                fontWeight: isElderly ? "bold" : "600"
              },
              textStyle
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center"
  }
});
