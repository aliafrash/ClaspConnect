import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function Header({
  title = "ClaspConnect",
  subtitle,
  role = "elderly",
  onBack,
  onLogout,
  isElderly = false
}) {
  const getRoleBadgeStyle = () => {
    switch (role) {
      case "volunteer":
        return { bg: COLORS.volunteer.badgeBg, text: COLORS.volunteer.primary, label: "Volunteer" };
      case "caregiver":
        return { bg: COLORS.caregiver.badgeBg, text: COLORS.caregiver.primary, label: "Caregiver" };
      case "admin":
        return { bg: COLORS.admin.badgeBg, text: COLORS.admin.primary, label: "Admin" };
      default:
        return { bg: COLORS.elderly.badgeBg, text: COLORS.elderly.primary, label: "Elderly User" };
    }
  };

  const badgeStyle = getRoleBadgeStyle();

  return (
    <View style={[styles.headerContainer, { paddingVertical: isElderly ? 18 : 14 }]}>
      <View style={styles.leftRow}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={isElderly ? 28 : 24} color={COLORS.text} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.logoIcon}>🤝</Text>
        )}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: isElderly ? 22 : 18 }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { fontSize: isElderly ? 16 : 12 }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightRow}>
        <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
          <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
            {badgeStyle.label}
          </Text>
        </View>
        {onLogout && (
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  logoIcon: {
    fontSize: 26,
    marginRight: 10
  },
  backButton: {
    marginRight: 12,
    padding: 4
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontWeight: "bold",
    color: COLORS.text
  },
  subtitle: {
    color: COLORS.subtext,
    marginTop: 2
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700"
  },
  logoutButton: {
    padding: 6
  }
});
