import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import Icon from "react-native-vector-icons/Ionicons";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import AppText from "../utils/AppText";
const snimka2 = require("../../assets/snimka2.jpg");

const ChatHeader: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
}> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: colors.whiteColor,
        padding: 10,
        paddingTop: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          backgroundColor: colors.whiteColor,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            style={{ fontSize: 30, color: colors.primaryColor }}
          />
        </TouchableOpacity>
        <Image source={snimka2} style={styles.profileImg} />
        <AppText styles={{ color: colors.primaryColor, fontSize: 23 }}>
          Chat name
        </AppText>
      </View>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Icon
          name="information-circle-outline"
          style={{
            color: colors.primaryColor,
            fontSize: 35,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
