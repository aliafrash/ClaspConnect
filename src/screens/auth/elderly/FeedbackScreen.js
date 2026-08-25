import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Header from "../../../components/Header";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../constants/colors";
import { submitVisitFeedback } from "../../../firebase/firestore";

export default function FeedbackScreen({ route, navigation }) {
  const { requestId, volunteerName } = route.params || {};
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitVisitFeedback(requestId || "req-101", rating, comments || "Great visit!");
    setLoading(false);

    Alert.alert(
      "Thank You! ❤️",
      `Your review for ${volunteerName || "the volunteer"} has been recorded. This helps us ensure high quality and safety!`,
      [
        {
          text: "Back to Home",
          onPress: () => navigation.navigate("ElderlyTab")
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Visit Feedback"
        subtitle={`Rate visit with ${volunteerName || "Volunteer"}`}
        role="elderly"
        isElderly
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.avatar}>🙋‍♀️</Text>
          <Text style={styles.vName}>{volunteerName || "Nimali"}</Text>
          <Text style={styles.sub}>How was your experience during this visit?</Text>

          <Text style={styles.ratingLabel}>Select Star Rating:</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starBtn}
              >
                <Text style={{ fontSize: 36 }}>{star <= rating ? "⭐" : "⚪"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.scoreText}>{rating} out of 5 Stars</Text>

          <InputField
            label="Share a nice note or feedback:"
            value={comments}
            onChangeText={setComments}
            placeholder="e.g. Very patient, punctual and kind companion!"
            multiline
            numberOfLines={4}
            isElderly
          />

          <CustomButton
            title="Submit Feedback & Thank Volunteer"
            variant="success"
            isElderly
            loading={loading}
            onPress={handleSubmit}
            style={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.elderly.bg
  },
  content: {
    padding: 18
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border
  },
  avatar: {
    fontSize: 50,
    marginBottom: 8
  },
  vName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text
  },
  sub: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 4,
    marginBottom: 18,
    textAlign: "center"
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 8
  },
  starBtn: {
    paddingHorizontal: 4
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.volunteer.primary,
    marginBottom: 20
  }
});
