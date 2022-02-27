import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../styles/colors";
import IconButton from "../styles/styledComponents/Buttons/IconButton";
import Icon from "react-native-vector-icons/Feather";
import AppText from "./utils/AppText";

const AuthNav: React.FC = () => {
  return (
    <View style={styles.navContainer}>
      <AppText styles={styles.title}>EventFinder</AppText>
      <View style={{ flexDirection: "row" }}>
        <IconButton style={{ marginRight: 5 }}>
          <Icon style={styles.icon} name="settings" />
        </IconButton>
      </View>
    </View>
  );
};

export default AuthNav;

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
