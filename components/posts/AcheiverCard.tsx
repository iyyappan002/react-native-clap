import { LastMonthAchiever } from "@/types/postTypes";
import { getInitials, getRandomRGBColor } from "@/utils/storage";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
  acheiver: LastMonthAchiever;
};

function AcheiverCard({ acheiver }: Props) {
  console.log(acheiver, "acheiver");

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.achieverContainer}>
        <Text
          style={[
            styles.logoText,
            { backgroundColor: getRandomRGBColor(acheiver.username) },
          ]}
        >
          {getInitials(acheiver.username)}
        </Text>
        <Text>{acheiver.username}</Text>
        <Text>{acheiver.jobcode}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  achieverContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "purple",
    borderRadius: 40,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default AcheiverCard;
