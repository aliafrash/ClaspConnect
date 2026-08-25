import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("RoleSelection");
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>🤝</Text>
        </View>
        <Text style={styles.title}>ClaspConnect</Text>
        <Text style={styles.subtitle}>Connecting Generations with Care</Text>
        <Text style={styles.description}>
          Elderly Companionship & Micro-Volunteering Platform
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.skipButton}
        onPress={() => navigation.replace("RoleSelection")}
      >
        <Text style={styles.skipText}>Get Started →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30
  },
  content: {
    alignItems: "center",
    marginTop: 60
  },
  logoBadge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  logoIcon: {
    fontSize: 54,
    lineHeight: 68,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false
  },
  title: {
    fontSize: 38,
    lineHeight: 46,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 1,
    includeFontPadding: false
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.accent,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
    includeFontPadding: false
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#E0D5FA",
    textAlign: "center",
    marginTop: 12,
    includeFontPadding: false
  },
  skipButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20
  },
  skipText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
    includeFontPadding: false
  }
});