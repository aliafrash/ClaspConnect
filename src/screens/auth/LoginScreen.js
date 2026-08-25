import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { COLORS } from "../../constants/colors";
import { loginUser, setMockUserRole } from "../../firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("perera@claspconnect.lk");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState("elderly");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    const res = await loginUser(email, password);
    setLoading(false);
    
    if (res.success) {
      const activeRole = res.profile?.role || selectedRole;
      setMockUserRole(activeRole);
      navigation.navigate("MainRoleStack", { screen: `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}Tab` });
    } else {
      Alert.alert("Login Failed", res.error || "Please check your credentials.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>🤝 ClaspConnect</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access your companionship portal</Text>
        </View>

        <Text style={styles.roleLabel}>Select your account type for quick login:</Text>
        <View style={styles.roleSelectorRow}>
          {[
            { id: "elderly", label: "Elderly" },
            { id: "volunteer", label: "Volunteer" },
            { id: "caregiver", label: "Caregiver" },
            { id: "admin", label: "Admin" }
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={[
                styles.roleChip,
                selectedRole === item.id && styles.roleChipActive
              ]}
              onPress={() => {
                setSelectedRole(item.id);
                setEmail(`${item.id}@claspconnect.lk`);
              }}
            >
              <Text
                style={[
                  styles.roleChipText,
                  selectedRole === item.id && styles.roleChipTextActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. perera@claspconnect.lk"
          icon="mail-outline"
          keyboardType="email-address"
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          icon="lock-closed-outline"
          secureTextEntry
        />

        <CustomButton
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={{ marginTop: 10 }}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>
            Don{"'"}t have an account? <Text style={styles.boldText}>Register Here</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backRoleLink}
          onPress={() => navigation.navigate("RoleSelection")}
        >
          <Text style={styles.backRoleText}>← Back to Persona Selector</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: "center",
    marginBottom: 24
  },
  logo: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
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
    marginTop: 4,
    includeFontPadding: false
  },
  roleLabel: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10,
    includeFontPadding: false
  },
  roleSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  roleChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border
  },
  roleChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  roleChipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.text,
    includeFontPadding: false
  },
  roleChipTextActive: {
    color: COLORS.white
  },
  registerLink: {
    marginTop: 16,
    alignItems: "center"
  },
  registerText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.subtext,
    includeFontPadding: false
  },
  boldText: {
    color: COLORS.primary,
    fontWeight: "bold"
  },
  backRoleLink: {
    marginTop: 20,
    alignItems: "center"
  },
  backRoleText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    fontWeight: "600",
    includeFontPadding: false
  }
});