import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
            activeOpacity={0.85}
            style={[styles.roleCard, { backgroundColor: role.bgColor, borderColor: role.color + "40" }]}
            onPress={() => handleSelectRole(role.id)}
          >
            <Text style={styles.roleIcon}>{role.icon}</Text>
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
          style={styles.authButtonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.authButtonPrimaryText}>Login to Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.authButtonSecondary}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.authButtonSecondaryText}>Register New User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40
  },
  header: {
    alignItems: "center",
    marginBottom: 24
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 6
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.subtext,
    textAlign: "center",
    marginTop: 6
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
  roleIcon: {
    fontSize: 38,
    marginRight: 14
  },
  roleTextContainer: {
    flex: 1
  },
  roleHeaderRow: {
    marginBottom: 4
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  roleSubtitle: {
    fontSize: 12,
    color: COLORS.subtext,
    fontWeight: "600"
  },
  roleDesc: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 18
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
    fontSize: 16
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
    fontSize: 16
  }
});
