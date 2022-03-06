import { StyleSheet, View } from "react-native";
import React from "react";
import AppText from "../utils/AppText";
import colors from "../../styles/colors";

const ErrorCard: React.FC<{ err_message: string }> = ({ err_message }) => {
  return (
    <View style={styles.errorCard}>
      <AppText styles={{ fontSize: 23, color: colors.whiteColor }}>
        {err_message}
      </AppText>
    </View>
  );
};

export default ErrorCard;

const styles = StyleSheet.create({
  errorCard: {
    padding: 15,
    backgroundColor: "rgba(252, 68, 69, .7)",
    marginVertical: 15,
    alignItems: "center",
  },
});
