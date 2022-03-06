import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../styles/colors";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import IconButton from "../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Feather";
import AppText from "./utils/AppText";

const Nav: React.FC<{
  navigation: MaterialTopTabNavigationProp<
    {
      Home: undefined;
      ChatsTab: undefined;
    },
    "Home"
  >;
}> = ({ navigation }) => {
  return (
    <View style={styles.navContainer}>
      <AppText styles={styles.title}>EventFinder</AppText>
      <View style={{ flexDirection: "row" }}>
        <IconButton>
          <Icon style={styles.icon} name="settings" />
        </IconButton>
        <IconButton
          style={{ marginLeft: 15, marginRight: 5 }}
          onPress={() => navigation.navigate("ChatsTab")}
        >
          <Icon style={styles.icon} name="message-circle" />
        </IconButton>
      </View>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    color: colors.whiteColor,
  },
  icon: {
    fontSize: 30,
    color: colors.whiteColor,
  },
});
