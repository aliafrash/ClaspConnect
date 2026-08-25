import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { setMockUserRole } from "../../firebase/auth";

export default function RoleSelectionScreen({ navigation }) {
  const roles = [
    {
      id: "elderly",
      title: "Elderly User",
      subtitle: "Mr. Perera (Age 72)",
      desc: "Request daily companionship, grocery help, or tech assistance simply.",
      icon: "👴",
      color: COLORS.elderly.primary,
      bgColor: COLORS.elderly.bg
    },
    {
      id: "volunteer",
      title: "Volunteer",
      subtitle: "Nimali (University Student)",
      desc: "Browse local micro-volunteering tasks, help elders & earn reward points.",
      icon: "🙋‍♀️",
      color: COLORS.volunteer.primary,
      bgColor: COLORS.volunteer.bg
    },
    {
      id: "caregiver",
      title: "Caregiver / Family",
      subtitle: "Thilini (Family Member)",
      desc: "Monitor your loved one's activities remotely with real-time status updates.",
      icon: "👩‍💼",
      color: COLORS.caregiver.primary,
      bgColor: COLORS.caregiver.bg
    },
    {
      id: "admin",
      title: "Administrator",
      subtitle: "System Admin",
      desc: "Verify volunteer IDs, moderate safety reports, and manage user accounts.",
      icon: "🛡️",
      color: COLORS.admin.primary,
      bgColor: COLORS.admin.bg
    }
  ];

  const handleSelectRole = (roleId) => {
    setMockUserRole(roleId);
    navigation.navigate("MainRoleStack", { screen: `${roleId.charAt(0).toUpperCase() + roleId.slice(1)}Tab` });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>🤝 ClaspConnect</Text>
          <Text style={styles.title}>Select Your Role</Text>
          <Text style={styles.subtitle}>
            Experience the platform through any of the four key persona portals
          </Text>
        </View>

        <View style={styles.cardsList}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              activeOpacity={0.75}
              style={[styles.roleCard, { backgroundColor: role.bgColor, borderColor: role.color + "40" }]}
              onPress={() => handleSelectRole(role.id)}
            >
              <View style={styles.roleIconContainer}>
                <Text style={styles.roleIcon}>{role.icon}</Text>
              </View>
              <View style={styles.roleTextContainer}>
                <View style={styles.roleHeaderRow}>
                  <Text style={[styles.roleTitle, { color: role.color }]}>{role.title}</Text>
                  <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
                </View>
                <Text style={styles.roleDesc}>{role.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.authButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.authButtonPrimary}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.authButtonPrimaryText}>Login to Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.authButtonSecondary}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.authButtonSecondaryText}>Register New User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: "center",
    marginBottom: 24
  },
  logo: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 6,
    includeFontPadding: false
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "bold",
    color: COLORS.text,
    includeFontPadding: false
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.subtext,
    textAlign: "center",
    marginTop: 6,
    includeFontPadding: false
  },
  cardsList: {
    marginBottom: 20
  },
  roleCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  roleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14
  },
  roleIcon: {
    fontSize: 34,
    lineHeight: 44,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  roleTextContainer: {
    flex: 1
  },
  roleHeaderRow: {
    marginBottom: 4
  },
  roleTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    includeFontPadding: false
  },
  roleSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.subtext,
    fontWeight: "600",
    includeFontPadding: false
  },
  roleDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.text,
    includeFontPadding: false
  },
  authButtonsRow: {
    marginTop: 10
  },
  authButtonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10
  },
  authButtonPrimaryText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
    includeFontPadding: false
  },
  authButtonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center"
  },
  authButtonSecondaryText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
    includeFontPadding: false
  }
});

