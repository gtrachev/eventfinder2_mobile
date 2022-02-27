import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";
import AppText from "../utils/AppText";
import Icon from "react-native-vector-icons/Ionicons";

const DiscoverFilterContainer = () => {
  return (
    <View style={styles.filterOptionsContainer}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
            alignItems: "center",
            marginRight: 10,
          }}
        >
          Sort by
        </AppText>
        <Icon
          name="options"
          style={{ color: colors.primaryColor, fontSize: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <AppText
          styles={{
            color: colors.primaryColor,
            fontSize: 20,
            alignItems: "center",
            marginRight: 10,
          }}
        >
          Filter
        </AppText>
        <Icon
          name="funnel-outline"
          style={{ color: colors.primaryColor, fontSize: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverFilterContainer;

const styles = StyleSheet.create({
  filterOptionsContainer: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
