import { Platform, StyleSheet, Text } from "react-native";
import React from "react";
import colors from "../../styles/colors";

const AppText: React.FC<{ styles?: any; numberOfLines?: number }> = ({
  children,
  styles = {},
  numberOfLines,
}) => {
  return (
    <Text
      style={{
        color: colors.secondaryColor,
        ...styles,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
      }}
      numberOfLines={numberOfLines ? numberOfLines : undefined}
    >
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({});
