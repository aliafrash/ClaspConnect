import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { COLORS } from "../../constants/colors";
import { registerUser, setMockUserRole } from "../../firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("elderly");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const res = await registerUser(name, email, password, role, { phone });
    setLoading(false);

    if (res.success) {
      setMockUserRole(role, { name, email, phone });
      Alert.alert("Account Created", `Welcome to ClaspConnect as a ${role.toUpperCase()}!`, [
        {
          text: "Proceed to Dashboard",
          onPress: () => {
            navigation.navigate("MainRoleStack", { screen: `${role.charAt(0).toUpperCase() + role.slice(1)}Tab` });
          }
        }
      ]);
    } else {
      Alert.alert("Registration Failed", res.error || "Could not register account.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>🤝 ClaspConnect</Text>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our elderly support and micro-volunteering network</Text>
      </View>

      <Text style={styles.roleLabel}>I am registering as:</Text>
      <View style={styles.roleGrid}>
        {[
          { id: "elderly", title: "Elderly User", icon: "👴" },
          { id: "volunteer", title: "Volunteer", icon: "🙋‍♀️" },
          { id: "caregiver", title: "Caregiver", icon: "👩‍💼" },
          { id: "admin", title: "Administrator", icon: "🛡️" }
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.roleCard,
              role === item.id && styles.roleCardActive
            ]}
            onPress={() => setRole(item.id)}
          >
            <Text style={styles.roleIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.roleCardTitle,
                role === item.id && styles.roleCardTitleActive
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <InputField
        label="Full Name"
        value={name}
        onChangeText={setName}
        placeholder="e.g. Mr. Perera / Nimali / Thilini"
        icon="person-outline"
      />

      <InputField
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        placeholder="e.g. user@claspconnect.lk"
        icon="mail-outline"
        keyboardType="email-address"
      />

      <InputField
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholder="e.g. +94 77 123 4567"
        icon="call-outline"
        keyboardType="phone-pad"
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Choose secure password"
        icon="lock-closed-outline"
        secureTextEntry
      />

      <CustomButton
        title="Register & Continue"
        onPress={handleRegister}
        loading={loading}
        style={{ marginTop: 10 }}
      />

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.boldText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    fontSize: 22,
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
    marginTop: 4
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10
  },
  roleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16
  },
  roleCard: {
    width: "48%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    marginBottom: 10
  },
  roleCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.elderly.badgeBg
  },
  roleIcon: {
    fontSize: 24,
    marginBottom: 4
  },
  roleCardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text
  },
  roleCardTitleActive: {
    color: COLORS.primary,
    fontWeight: "bold"
  },
  loginLink: {
    marginTop: 16,
    alignItems: "center"
  },
  loginText: {
    fontSize: 14,
    color: COLORS.subtext
  },
  boldText: {
    color: COLORS.primary,
    fontWeight: "bold"
  }
});