import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={[styles.headerContainer, { paddingVertical: isElderly ? 16 : 12 }]}>
        <View style={styles.leftRow}>
          {onBack ? (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={isElderly ? 28 : 24} color={COLORS.text} />
            </TouchableOpacity>
          ) : (
            <View style={styles.logoIconContainer}>
              <Text style={styles.logoIcon}>🤝</Text>
            </View>
          )}
          <View style={styles.titleContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                { fontSize: isElderly ? 22 : 18, lineHeight: isElderly ? 28 : 24 }
              ]}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                numberOfLines={1}
                style={[
                  styles.subtitle,
                  { fontSize: isElderly ? 15 : 12, lineHeight: isElderly ? 20 : 16 }
                ]}
              >
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
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton} activeOpacity={0.7}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    zIndex: 10
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
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
    flex: 1,
    marginRight: 8
  },
  logoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.elderly.badgeBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  logoIcon: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    borderRadius: 8
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  subtitle: {
    color: COLORS.subtext,
    marginTop: 2,
    includeFontPadding: false
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 4
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    includeFontPadding: false
  },
  logoutButton: {
    padding: 6,
    marginLeft: 4
  }
});

