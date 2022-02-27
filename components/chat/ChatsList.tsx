import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";
import type { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
const snimka2 = require("../../assets/snimka2.jpg");

const ChatsList: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      UserChats: undefined;
      CurrentChat: undefined;
    },
    "UserChats"
  >;
}> = ({ navigation }) => {
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("CurrentChat")}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 15,
          }}
        >
          <Image style={styles.profileImg} source={snimka2} />
          <View>
            <AppText styles={{ fontSize: 20 }}>Username</AppText>
            <AppText styles={{ color: colors.grayColor, fontSize: 18 }}>
              Hello.
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChatsList;

const styles = StyleSheet.create({
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
});
