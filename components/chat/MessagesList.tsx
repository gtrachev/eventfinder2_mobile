import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
const snimka2 = require("../../assets/snimka2.jpg");

const MessagesList = () => {
  return (
    <ScrollView style={{ flexGrow: 1, padding: 10 }}>
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={snimka2}
            style={[styles.profileImg, { marginRight: 10 }]}
          />
          <View style={styles.message}>
            <AppText styles={{ color: colors.whiteColor, fontSize: 20 }}>
              THis is a message
            </AppText>
          </View>
        </View>
        <AppText styles={{ color: colors.grayColor, fontSize: 17 }}>
          2 hours ago
        </AppText>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={[styles.message, { backgroundColor: colors.primaryColor }]}
          >
            <AppText styles={{ color: colors.whiteColor, fontSize: 20 }}>
              THis is a message
            </AppText>
          </View>
          <Image
            source={snimka2}
            style={[styles.profileImg, { marginLeft: 10 }]}
          />
        </View>
        <AppText styles={{ color: colors.grayColor, fontSize: 17 }}>
          2 hours ago
        </AppText>
      </View>
    </ScrollView>
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  profileImg: { width: 50, height: 50, borderRadius: 25 },
  message: {
    maxWidth: "80%",
    padding: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 15,
  },
});
